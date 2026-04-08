import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Departamento } from "src/entity/departamento.entity";
import { DepartamentoController } from "./departamento.controller";
import { DepartamentoService } from "./departamento.service";
import { Empresa } from "src/entity/empresa.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Departamento,Empresa]),
    ],
    controllers: [DepartamentoController],
    providers: [DepartamentoService]
})
export class DepartamentoModule {}