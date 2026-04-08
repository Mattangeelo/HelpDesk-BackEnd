import { IsNotEmpty, IsString, MaxLength, MinLength, IsNumber } from "class-validator";

export class CreateDepartamento {

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  id_empresa: number;
}