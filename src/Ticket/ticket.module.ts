import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticket } from "src/entity/ticket.entity";
import { TicketController } from "./ticket.controller";
import { TicketService } from "./ticket.service";
import { Usuario } from "src/entity/usuario.entity";
import { Empresa } from "src/entity/empresa.entity";
import { Departamento } from "src/entity/departamento.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Ticket,Usuario,Empresa,Departamento]),
    ],
    controllers: [TicketController],
    providers: [TicketService]
})

export class TicketModule {}