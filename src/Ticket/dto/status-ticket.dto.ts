import { IsIn } from "class-validator";

export class UpdateStatusTicket {
  @IsIn(['aberto', 'em_andamento', 'fechado'])
  status: string;
}