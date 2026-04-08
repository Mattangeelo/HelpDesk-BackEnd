import { Body, Controller, Delete, Get, Param, Post,Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { CreateUsuario } from "./dto/create-usuario.dto";
import { UpdateUsuario } from "./dto/update-usuario.dto";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/Auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/Auth/guards/roles.guard";
import { Public } from "src/Auth/decorators/public.decorator";
import { AceitoUsuario } from "./dto/aceito.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('Usuario')
export class UsuarioController {
    constructor (
        private readonly usuarioService: UsuarioService,
    ) {}

    @Roles('admin')
    @Get(':id_empresa/pendentes')
    findPendentes(@Param('id_empresa', ParseIntPipe) id_empresa: number) {
        return this.usuarioService.findPendentes(id_empresa);
    }

    @Roles('admin')
    @Get(':id')
    findAll(@Param('id') id:number){
        return this.usuarioService.findAll(Number(id));
    }

    @Roles('admin','user')
    @Get(':id_empresa/:id')
    async findOne(
        @Param('id_empresa', ParseIntPipe) id_empresa: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.usuarioService.findOne(id, id_empresa);
    }

    @Public()
    @Post()
    create(@Body() body:CreateUsuario) {
        return this.usuarioService.create(body);
    }

    @Roles('admin','user')
    @Put(':id_empresa/:id')
    update(
        @Param('id_empresa', ParseIntPipe) id_empresa: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateUsuario,
        ) {
        return this.usuarioService.update(id, id_empresa, body);
    }
    @Roles('admin','user')
    @Delete(':id_empresa/:id')
    remove(
        @Param('id_empresa',ParseIntPipe) id_empresa:number,
        @Param('id', ParseIntPipe) id:number,
    ) {
        return this.usuarioService.remove(id,id_empresa);
    }

    @Roles('admin')
    @Post('aceito')
    aceito(@Body() body:AceitoUsuario){
      return this.usuarioService.aceito(body);  
    }
}