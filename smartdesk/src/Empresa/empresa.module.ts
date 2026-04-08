import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Empresa } from "src/entity/empresa.entity";
import { EmpresaController } from "./empresa.controller";
import { EmpresaService } from "./empresa.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Empresa]),
    ],
    controllers: [EmpresaController],
    providers: [EmpresaService],
})

export class EmpresaModule {}