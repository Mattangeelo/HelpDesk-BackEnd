import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class CreateEmpresa {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  razao_social: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(18)
  @MaxLength(18)
  cnpj: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-]).*$/)
  senha: string;
}