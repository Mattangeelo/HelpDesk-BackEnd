import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Ticket } from "./ticket.entity";
import { Departamento } from "./departamento.entity";
import * as bcrypt from 'bcrypt';

@Entity('empresas')
export class Empresa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    razao_social: string;

    @Column({ unique:true })
    cnpj: string;

    @Column({ unique:true })
    email: string;

    @Column()
    senha: string;

    @BeforeInsert()
    async hashPasswordInsert() {
    if (this.senha) {
        this.senha = await bcrypt.hash(this.senha, 10);
    }
    }

    @BeforeUpdate()
    async hashPasswordUpdate() {
    if (this.senha && !this.senha.startsWith('$2b$')) {
        this.senha = await bcrypt.hash(this.senha, 10);
    }
    }

    @OneToMany(() => Usuario, (usuario) => usuario.empresa)
    usuarios: Usuario[];

    @OneToMany(() => Ticket, (ticket) => ticket.empresa)
    tickets: Ticket[];

    @OneToMany(() => Departamento, (departamento) => departamento.empresa)
    departamentos: Departamento[];

    @CreateDateColumn()
    created_at: Date;
    
    @CreateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}