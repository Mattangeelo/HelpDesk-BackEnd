import { IsNotEmpty, IsNumber, IsString, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class CreateTicket {

  @IsString({ message: 'Título deve ser um texto' })
  @IsNotEmpty({ message: 'Título é obrigatório' })
  titulo: string;

  @IsString({ message: 'Descrição deve ser um texto' })
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  descricao: string;

  @IsString({ message: 'Categoria deve ser um texto' })
  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  categoria: string;

  @IsString({ message: 'Prioridade deve ser um texto' })
  @IsNotEmpty({ message: 'Prioridade é obrigatória' })
  @IsIn(['baixa', 'media', 'alta'], {
    message: 'Prioridade deve ser: baixa, media ou alta'
  })
  prioridade: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  @IsNotEmpty({ message: 'Empresa é obrigatória' })
  id_empresa: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'ID do usuário deve ser um número' })
  @IsNotEmpty({ message: 'Usuário é obrigatório' })
  id_usuario: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'ID do departamento deve ser um número' })
  @IsNotEmpty({ message: 'Departamento é obrigatório' })
  id_departamento: number;
}