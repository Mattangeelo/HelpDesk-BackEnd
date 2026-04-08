import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Empresa } from "./empresa.entity";
import { Anexo } from "./anexo.entity";


@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    status: string;

    @Column()
    categoria: string;

    @Column()
    prioridade: string;

    @Column()
    departamento: string;

    @ManyToOne(() => Usuario,(usuario) => usuario.tickets)
    @JoinColumn({ name: 'id_usuario'})
    usuarios: Usuario;

    @ManyToOne(() => Empresa,(empresa) => empresa.tickets)
    @JoinColumn({ name: 'id_empresa'})
    empresa: Empresa;

    @OneToMany(() => Anexo,(anexo)=> anexo.tickets)
    anexos: Anexo [];

    @CreateDateColumn()
    created_at: Date;
            
    @CreateDateColumn()
    updated_at: Date;
        
    @DeleteDateColumn()
    deleted_at: Date;
}