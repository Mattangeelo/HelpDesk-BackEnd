import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./empresa.entity";
import { Ticket } from "./ticket.entity";


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
    
    @Column({ unique: true })
    cpf: string;

    @ManyToOne(() => Empresa,(empresa) => empresa.usuarios)
    @JoinColumn({ name: 'id_empresa'})
    empresa:Empresa;

    @OneToMany(() => Ticket, (ticket) => ticket.usuarios)
    tickets: Ticket[];

    @Column()
    permissao: string;

    @Column()
    ativo: boolean;

    @CreateDateColumn()
    created_at: Date;
        
    @CreateDateColumn()
    updated_at: Date;
    
    @DeleteDateColumn()
    deleted_at: Date;
}
