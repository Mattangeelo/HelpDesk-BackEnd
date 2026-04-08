import { BeforeInsert,BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./empresa.entity";
import { Ticket } from "./ticket.entity";
import * as bcrypt from 'bcrypt';

@Index(['cpf', 'empresa'], { unique: true })
@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPasswordInsert() {
        if (this.senha) {
            this.senha = await bcrypt.hash(this.senha, 10);
        }
    }
    
    @Column()
    cpf: string;
    
    @Column({ default: false })
    aceito: boolean;

    @Column({ default: false })
    cod_verificação: string;

    @ManyToOne(() => Empresa,(empresa) => empresa.usuarios)
    @JoinColumn({ name: 'id_empresa'})
    empresa:Empresa;

    @OneToMany(() => Ticket, (ticket) => ticket.usuario)
    tickets: Ticket[];


    @CreateDateColumn()
    created_at: Date;
        
    @CreateDateColumn()
    updated_at: Date;
    
    @DeleteDateColumn({ nullable: true })
    deleted_at: Date | null;
}
