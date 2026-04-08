import { IsOptional, IsString, IsIn } from "class-validator";

export class UpdateTicket {

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsString()
  @IsIn(['baixa', 'media', 'alta'])
  prioridade?: string;
}