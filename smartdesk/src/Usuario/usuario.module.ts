import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "src/entity/usuario.entity";
import { UsuarioController } from "./usuario.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [UsuarioController],
})
export class UsuarioModule {}