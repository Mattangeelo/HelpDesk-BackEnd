import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";


@Entity('anexos')
export class Anexo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => (Ticket),(ticket) => ticket.anexos)
    @JoinColumn({ name: 'id_ticket'})
    tickets: Ticket;

    @Column()
    nome_original: string;

    @Column()
    nome_arquivo: string;

    @Column()
    caminho: string;

    @Column()
    mime_type: string;

    @CreateDateColumn()
    created_at: Date;
        
    @CreateDateColumn()
    updated_at: Date;
    
    @DeleteDateColumn()
    deleted_at: Date;
}