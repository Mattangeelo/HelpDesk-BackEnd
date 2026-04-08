import { IsString, IsEmail, IsNotEmpty, MinLength, Matches, IsNumber } from 'class-validator';
import { IsCPF } from 'src/common/validators/is-cpf.validator';

export class CreateUsuario {

  @IsString({ message: 'Nome deve ser um texto' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString({ message: 'Senha deve ser um texto' })
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message: 'Senha deve conter letra maiúscula, minúscula, número e símbolo',
  })
  senha: string;

  @IsString({ message: 'CPF deve ser um texto' })
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsCPF({ message: 'CPF inválido' })
  cpf: string;

  @IsNumber({}, { message: 'ID da empresa deve ser um número' })
  @IsNotEmpty({ message: 'Empresa é obrigatória' })
  id_empresa: number;
}