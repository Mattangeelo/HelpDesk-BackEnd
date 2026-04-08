import { 
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import { Empresa } from "./empresa.entity";

@Entity('departamentos')
@Unique(['nome', 'empresa']) // 👈 AQUI
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.departamentos)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Empresa;

  @Column()
  nome: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}