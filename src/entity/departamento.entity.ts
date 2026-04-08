import { 
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import { Empresa } from "./empresa.entity";
import { Ticket } from "./ticket.entity";

@Entity('departamentos')
@Unique(['nome', 'empresa']) // 👈 AQUI
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.departamentos)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @OneToMany(() => Ticket, (ticket) => ticket.departamento)
  tickets: Ticket[];

  @Column()
  nome: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}