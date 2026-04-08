import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateDepartamento {
  @IsString()
  @IsNotEmpty()
  nome: string;
}