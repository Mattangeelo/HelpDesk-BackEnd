import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Empresa } from "./empresa.entity";
import { Anexo } from "./anexo.entity";
import { Departamento } from "./departamento.entity";


@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: string;
    
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

    @ManyToOne(() => Departamento, (departamento) => departamento.tickets)
    @JoinColumn({ name: 'id_departamento' })
    departamento: Departamento;

    @ManyToOne(() => Usuario,(usuario) => usuario.tickets)
    @JoinColumn({ name: 'id_usuario'})
    usuario: Usuario;

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