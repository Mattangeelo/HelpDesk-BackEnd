import { Injectable, NotFoundException,BadRequestException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Departamento } from "src/entity/departamento.entity";
import { Repository } from "typeorm";
import { CreateDepartamento } from "./dto/create-departamento.dto";
import { Empresa } from "src/entity/empresa.entity";
import { DepartamentoResponse } from "./dto/response-departamento.dto";
import { UpdateDepartamento } from "./dto/update-departamento.dto";


@Injectable()
export class DepartamentoService {
    constructor(
        @InjectRepository(Departamento)
        private departamentoRepository: Repository<Departamento>,
        @InjectRepository(Empresa)
        private empresaRepository: Repository<Empresa>,
    ) {}

    async findAll(id_empresa: number) {

        const empresaExiste = await this.empresaRepository.exists({
            where: { id: id_empresa },
        });

        if (!empresaExiste) {
            throw new NotFoundException('Empresa não encontrada');
        }

        return this.departamentoRepository.find({
            where: {
            empresa: { id: id_empresa },
            },
            select: ['id', 'nome'],
        });
    }

    async findOne(id: number, id_empresa: number) {
        const departamento = await this.departamentoRepository.findOne({
            where: {
            id,
            empresa: { id: id_empresa },
            },
        });

        if (!departamento) {
            throw new NotFoundException(
            'Departamento não encontrado',
            );
        }

        return departamento;
    }

    async create(data: CreateDepartamento): Promise<DepartamentoResponse> {

        const empresa = await this.empresaRepository.findOne({
            where: { id: data.id_empresa },
        });

        if (!empresa) {
            throw new NotFoundException('Empresa não encontrada');
        }

        const departamentoExistente = await this.departamentoRepository.findOne({
            where: {
                nome: data.nome,
                empresa: { id: data.id_empresa }
            },
            relations: ['empresa'],
            withDeleted: true
        });

        if (departamentoExistente) {

            if (departamentoExistente.deleted_at) {

                await this.departamentoRepository.restore(departamentoExistente.id);

                const restoredDepartamento = await this.departamentoRepository.findOne({
                    where: { id: departamentoExistente.id }
                });

                if (!restoredDepartamento) {
                    throw new NotFoundException('Erro ao restaurar departamento');
                }

                Object.assign(restoredDepartamento, {
                    nome: data.nome,
                    empresa
                });

                const saved = await this.departamentoRepository.save(restoredDepartamento);

                return {
                    id: saved.id,
                    nome: saved.nome
                };
            }

            throw new ConflictException('Este departamento já existe nesta empresa');
        }

        const departamento = this.departamentoRepository.create({
            nome: data.nome,
            empresa
        });

        const saved = await this.departamentoRepository.save(departamento);

        return {
            id: saved.id,
            nome: saved.nome
        };
    }

    async update(
        id: number,
        id_empresa: number,
        data: UpdateDepartamento,
        ): Promise<DepartamentoResponse> {

        const empresa = await this.empresaRepository.findOne({
            where: { id: id_empresa },
        });

        if (!empresa) {
            throw new NotFoundException('Empresa não encontrada');
        }

        const departamento = await this.departamentoRepository.findOne({
            where: {
            id,
            empresa: { id: id_empresa },
            },
        });

        if (!departamento) {
            throw new NotFoundException(
            'Departamento não encontrado para essa empresa',
            );
        }

        const nomeJaExiste = await this.departamentoRepository.exists({
            where: {
            nome: data.nome,
            empresa: { id: id_empresa },
            },
        });

        if (nomeJaExiste && departamento.nome !== data.nome) {
            throw new BadRequestException(
            'Já existe um departamento com esse nome nessa empresa',
            );
        }

        departamento.nome = data.nome;

        const updated = await this.departamentoRepository.save(departamento);

        return {
            id: updated.id,
            nome: updated.nome,
        };
    }

    async remove(id: number, id_empresa: number) {

        const departamento = await this.departamentoRepository.findOne({
            where: {
            id,
            empresa: { id: id_empresa },
            },
        });

        if (!departamento) {
            throw new NotFoundException(
            'Departamento não encontrado para essa empresa',
            );
        }

        await this.departamentoRepository.softDelete(id);
        return{
            message: 'Departameto removido com sucesso',
        };
        
    }
    
}