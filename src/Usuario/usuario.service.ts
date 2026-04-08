import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Empresa } from "src/entity/empresa.entity";
import { Usuario } from "src/entity/usuario.entity";
import { Repository } from "typeorm";
import { CreateUsuario } from "./dto/create-usuario.dto";
import { UsuarioResponse } from "./dto/response-usuario.dto";
import { UpdateUsuario } from "./dto/update-usuario.dto";
import * as bcrypt from 'bcrypt';
import { AceitoUsuario } from "./dto/aceito.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        @InjectRepository(Empresa)
        private empresaRepository: Repository<Empresa>,
    ){}

    private isValidCPF(cpf: string): boolean {
        if (cpf.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(cpf)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let firstDigit = 11 - (sum % 11);
        if (firstDigit >= 10) firstDigit = 0;
        if (firstDigit !== parseInt(cpf.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let secondDigit = 11 - (sum % 11);
        if (secondDigit >= 10) secondDigit = 0;
        if (secondDigit !== parseInt(cpf.charAt(10))) return false;

        return true;
    }

    async findAll (id_empresa: number){
        const empresaExiste = await this.empresaRepository.exists({
            where: { id:id_empresa },
        });

        if(!empresaExiste) {
            throw new NotFoundException('Empresa não encontrada');
        }
        return this.usuarioRepository.find({
            where: {
                empresa: { id: id_empresa },
            },
            select:['id','nome','email','cpf','created_at'],
        });
    }

    async findPendentes(id_empresa: number) {
        const empresaExiste = await this.empresaRepository.exists({
            where: { id: id_empresa },
        });

        if (!empresaExiste) {
            throw new NotFoundException('Empresa não encontrada');
        }

        return this.usuarioRepository.find({
            where: {
                empresa: { id: id_empresa },
                aceito: false,
            },
            select: ['id', 'nome', 'email', 'cpf', 'created_at'],
        });
    }

    async findOne(id:number, id_empresa:number){
        const usuario = await this.usuarioRepository.findOne({
            where:{
                id,
                empresa: {id: id_empresa},
            }
        });
        if(!usuario){
            throw new NotFoundException(
                'Usuario não encontrado',
            );
        }

        return usuario;
    }

    async findByEmail(email: string) {
        const buscado = email.trim().toLowerCase();

        const usuario = await this.usuarioRepository.findOne({
            where: { email: buscado },
            relations: ['empresa'],
        });

        return usuario;
    }

    async create(data: CreateUsuario): Promise<UsuarioResponse> {

        const email = data.email.toLowerCase();
        const cpf = data.cpf.replace(/\D/g, '');

        if (!this.isValidCPF(cpf)) {
            throw new BadRequestException('CPF inválido');
        }

        const empresa = await this.empresaRepository.findOne({
            where: { id: data.id_empresa },
        });

        if (!empresa) {
            throw new NotFoundException('Empresa não encontrada');
        }

        const usuarioExistente = await this.usuarioRepository.findOne({
            where: [
                { email },
                { cpf, empresa: { id: data.id_empresa } }
            ],
            relations: ['empresa'],
            withDeleted: true
        });

        if (usuarioExistente) {

            if (usuarioExistente.deleted_at) {

                await this.usuarioRepository.restore(usuarioExistente.id);

                usuarioExistente.deleted_at = null;
                const senhaHash = await bcrypt.hash(data.senha, 10);

                Object.assign(usuarioExistente, {
                    nome: data.nome,
                    email,
                    senha: senhaHash,
                    cpf,
                    empresa
                });

                const restored = await this.usuarioRepository.save(usuarioExistente);

                return {
                    id: restored.id,
                    nome: restored.nome,
                    email: restored.email,
                    cpf: restored.cpf,
                    message: 'Usuário restaurado e atualizado com sucesso'
                };
            }

            if (usuarioExistente.email === email) {
                throw new BadRequestException('Este email já está cadastrado');
            }

            if (usuarioExistente.cpf === cpf) {
                throw new BadRequestException('Este CPF já está cadastrado nesta empresa');
            }
        }

        const senhaHash = await bcrypt.hash(data.senha, 10);

        const usuario = this.usuarioRepository.create({
            nome: data.nome,
            email,
            senha: senhaHash,
            cpf,
            empresa
        });

        const saved = await this.usuarioRepository.save(usuario);

        return {
            id: saved.id,
            nome: saved.nome,
            email: saved.email,
            cpf: saved.cpf,
            message: 'Usuário criado com sucesso',
        };
    }

    async update(
        id: number,
        id_empresa: number,
        data: UpdateUsuario,
    ): Promise<UsuarioResponse> {

        const empresa = await this.empresaRepository.findOne({
            where: { id: id_empresa },
        });

        if (!empresa) {
            throw new NotFoundException('Empresa não encontrada');
        }

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id,
                empresa: { id: id_empresa },
            },
        });

        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado');
        }

        if (data.email) {
            data.email = data.email.toLowerCase();
            if (data.email !== usuario.email) {
                const emailExiste = await this.usuarioRepository.existsBy({
                    email: data.email,
                    empresa: { id: id_empresa },
                });
                if (emailExiste) {
                    throw new BadRequestException('Este email já está cadastrado nesta empresa');
                }
            }
            usuario.email = data.email;
        }

        if (data.nome) usuario.nome = data.nome;
        
        if (data.senha) {
            usuario.senha = await bcrypt.hash(data.senha, 10);
        }

        const saved = await this.usuarioRepository.save(usuario);

        return {
            id: saved.id,
            nome: saved.nome,
            email: saved.email,
            cpf: usuario.cpf,
            message: 'Usuário atualizado com sucesso',
        };
    }

    async remove(id: number,id_empresa:number){
        const usuario = await this.usuarioRepository.findOne({
            where: {
                id,
                empresa: { id: id_empresa },
            }
        });

        if(!usuario) {
            throw new NotFoundException('Usuario não encontrado');
        }

        await this.usuarioRepository.softDelete(id);
        return{
            message: 'Usuario removido com sucesso',
        };
    }

    async aceito(data: AceitoUsuario): Promise<AceitoUsuario>{
        const id = data.id_usuario;
        const id_empresa = data.id_empresa;
        const usuario = await this.usuarioRepository.findOne({
            where:{
                id,
                empresa: {id: id_empresa},
            }
        });

        if(!usuario){
            throw new NotFoundException('Usuario não encontrado'); 
        }
        
        if (data.aceito === true) {
            await this.usuarioRepository.update(usuario.id, { aceito: true });

            return {
                id_usuario: usuario.id,
                id_empresa: id_empresa,
                aceito: true
            };
        }

        await this.usuarioRepository.delete(usuario.id);
        throw new BadRequestException(
            'Usuario foi reprovado, por favor verifique com sua empresa.'
        );
    }
}