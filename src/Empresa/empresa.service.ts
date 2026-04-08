import { Injectable, NotFoundException,ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Empresa } from '../entity/empresa.entity';
import { Repository } from "typeorm";
import { CreateEmpresa } from "./dto/create-empresa.dto";
import { UpdateEmpresa } from "./dto/update-empresa.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmpresaService {
    constructor(
        @InjectRepository(Empresa)
        private empresaRepository: Repository<Empresa>,
    ) {}

    async findAll() {
        return this.empresaRepository.find();
    }

    async findOne(id: number){
        const empresa = await this.empresaRepository.findOne({
            where: {id},
        });

        if(!empresa){
            throw new NotFoundException('Empresa não encontrada, por favor tente novamente!');
        }

        return empresa;
    }

    async findByEmail(email: string) {
        const empresa = await this.empresaRepository.findOne({
            where: { email },
            select: ['id', 'email', 'senha', 'razao_social'] // Force o campo 'senha' aqui
        });
        return empresa;
    }

    async create(data: CreateEmpresa) {
        const empresaExistente = await this.empresaRepository.findOne({
            where: [
            { cnpj: data.cnpj },
            { email: data.email }
            ],
            withDeleted: true, 
        });

        if (empresaExistente) {
            if (empresaExistente.deleted_at) {
            await this.empresaRepository.restore(empresaExistente.id);
            
            
            Object.assign(empresaExistente, data);
            (empresaExistente as any).deleted_at = null;
            
            return await this.empresaRepository.save(empresaExistente);
            }

            // 3. Se ela existe e NÃO está deletada, aí sim é erro de duplicidade real
            throw new ConflictException('Empresa com este CNPJ ou Email já está ativa no sistema.');
        }

        // 4. Se não existe de forma alguma, cria uma nova normalmente
        const novaEmpresa = this.empresaRepository.create(data);
        return await this.empresaRepository.save(novaEmpresa);
    }

    async update(id:number,data: UpdateEmpresa) {
        const empresa = await this.findOne(id);

        if(!empresa){
            throw new NotFoundException('Empresa não encontrada, por favor tente novamente!');
        }

        Object.assign(empresa,data);

        return this.empresaRepository.save(empresa);
    }

    async delete(id:number){
        const empresa = await this.findOne(id)

        if(!empresa){
            throw new NotFoundException('Empresa não encontrada, por favor tente novamente!');
        }

        this.empresaRepository.softDelete(id)
        
        return{
            message: 'Empresa removida com sucesso',
        };
    }
}