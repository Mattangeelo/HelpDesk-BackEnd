import { Injectable, NotFoundException } from "@nestjs/common";
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

    async create(data: CreateEmpresa) {

        const exists = await this.empresaRepository.findOne({
            where: [
            { cnpj: data.cnpj },
            { email: data.email },
            ],
        });

        if (exists) {
            throw new NotFoundException('CNPJ ou email já cadastrado');
        }

        const empresa = this.empresaRepository.create(data);

        return this.empresaRepository.save(empresa);
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