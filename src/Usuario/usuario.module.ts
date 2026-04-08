import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "src/entity/usuario.entity";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { Empresa } from "src/entity/empresa.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Usuario,Empresa])],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService],
})
export class UsuarioModule {}