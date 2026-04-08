import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Departamento } from "src/entity/departamento.entity";
import { Repository } from "typeorm";
import { CreateDepartamento } from "./dto/create-departamento.dto";
import { Empresa } from "src/entity/empresa.entity";
import { DepartamentoResponse } from "./dto/response-departamento.dto";


@Injectable()
export class DepartamentoService {
    constructor(
        @InjectRepository(Departamento)
        private departamentoRepository: Repository<Departamento>,
        @InjectRepository(Empresa)
        private empresaRepository: Repository<Empresa>,
    ) {}

    async findAll(id_empresa: number) {

        const empresaExiste = await this.empresaRepository.exist({
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
            'Departamento não encontrado para essa empresa',
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

        const departamento = this.departamentoRepository.create({
            nome: data.nome,
            empresa,
        });

        const saved = await this.departamentoRepository.save(departamento);

        return {
            id: saved.id,
            nome: saved.nome,
        };
    }

    
}