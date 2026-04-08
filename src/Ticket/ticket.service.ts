import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Empresa } from "src/entity/empresa.entity";
import { Ticket } from "src/entity/ticket.entity";
import { Usuario } from "src/entity/usuario.entity";
import { Departamento } from "src/entity/departamento.entity";
import { Repository } from "typeorm";
import { CreateTicket } from "./dto/create-ticket.dto";
import { UpdateTicket } from "./dto/update-ticket.dto";
import { TicketResponse } from "./dto/response-ticlet.dto";

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private ticketRepository: Repository<Ticket>,

        @InjectRepository(Empresa)
        private empresaRepository: Repository<Empresa>,

        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,

        @InjectRepository(Departamento)
        private departamentoRepository: Repository<Departamento>,
    ) {}


    private async findEntity(id: number): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOne({
            where: { id },
            relations: ['usuario', 'empresa', 'departamento', 'anexos'],
        });

        if (!ticket) {
            throw new NotFoundException('Ticket não encontrado');
        }

        return ticket;
    }


    async findAll(id_empresa: number) {
        const empresaExiste = await this.empresaRepository.exists({
            where: { id: id_empresa },
        });

        if (!empresaExiste) {
            throw new NotFoundException('Empresa não encontrada');
        }

        const tickets = await this.ticketRepository.find({
            where: {
                empresa: { id: id_empresa }
            },
            relations: ['usuario','empresa','departamento','anexos']
        });

        return tickets.map(ticket => this.toResponse(ticket));
    }

    async findOne(id: number) {
        const ticket = await this.findEntity(id);
        return this.toResponse(ticket);
    }


    async findPorUsuario(id_usuario: number) {
        const tickets = await this.ticketRepository.find({
            where: {
                usuario: { id: id_usuario }
            },
            relations: ['usuario','empresa','departamento','anexos']
        });

        return tickets.map(ticket => this.toResponse(ticket));
    }

    async findPorDepartamento(id_departamento: number) {
        const tickets = await this.ticketRepository.find({
            where: {
                departamento: { id: id_departamento }
            },
            relations: ['usuario','empresa','departamento','anexos']
        });

        return tickets.map(ticket => this.toResponse(ticket));
    }


    async create(data: CreateTicket) {
        const empresa = await this.empresaRepository.findOne({
            where: { id: data.id_empresa }
        });

        if (!empresa) {
            throw new NotFoundException('Empresa não encontrada');
        }

        const usuario = await this.usuarioRepository.findOne({
            where: { id: data.id_usuario }
        });

        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const departamento = await this.departamentoRepository.findOne({
            where: { id: data.id_departamento }
        });

        if (!departamento) {
            throw new NotFoundException('Departamento não encontrado');
        }

        const novoTicket = this.ticketRepository.create({
            ...data,
            status: 'aberto',
            codigo: `TCK-${Date.now()}`,
            empresa,
            usuario,
            departamento
        });

        const saved = await this.ticketRepository.save(novoTicket);

        return this.toResponse(saved);
    }

    async update(id: number, data: UpdateTicket) {
        const ticket = await this.findEntity(id);

        Object.assign(ticket, data);

        const updated = await this.ticketRepository.save(ticket);

        return this.toResponse(updated);
    }

    async remove(id: number) {
        const ticket = await this.findEntity(id);

        await this.ticketRepository.softRemove(ticket);

        return { message: 'Ticket removido com sucesso' };
    }


    async updateStatus(id: number, status: string) {
        const ticket = await this.findEntity(id);

        if (ticket.status === 'fechado') {
            throw new Error('Ticket já está fechado');
        }

        ticket.status = status;

        const updated = await this.ticketRepository.save(ticket);

        return this.toResponse(updated);
    }


    async findWithFilter(filters: { status?: string; id_empresa?: number }) {
        const where: any = {};

        if (filters.status) {
            where.status = filters.status;
        }

        if (filters.id_empresa) {
            where.empresa = { id: filters.id_empresa };
        }

        const tickets = await this.ticketRepository.find({
            where,
            relations: ['usuario','empresa','departamento','anexos']
        });

        return tickets.map(ticket => this.toResponse(ticket));
    }


    private toResponse(ticket: Ticket): TicketResponse {
        return {
            id: ticket.id,
            codigo: ticket.codigo,
            titulo: ticket.titulo,
            descricao: ticket.descricao,
            status: ticket.status,
            categoria: ticket.categoria,
            prioridade: ticket.prioridade,

            departamento: ticket.departamento ? {
                id: ticket.departamento.id,
                nome: ticket.departamento.nome,
            } : { id: 0, nome: 'Sem departamento' },

            usuario: ticket.usuario ? {
                id: ticket.usuario.id,
                nome: ticket.usuario.nome,
                email: ticket.usuario.email,
            } : { id: 0, nome: 'Removido', email: '' },

            empresa: ticket.empresa ? {
                id: ticket.empresa.id,
                razao_social: ticket.empresa.razao_social,
                email: ticket.empresa.email,
            } : { id: 0, razao_social: 'Removida', email: '' },
        };
    }
}