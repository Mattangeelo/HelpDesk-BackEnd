import { IsString, IsEmail, IsBoolean, IsNumber, IsOptional, Length } from 'class-validator';

export class UpdateUsuario {

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 20)
  senha?: string;

}