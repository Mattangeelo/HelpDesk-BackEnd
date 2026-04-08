import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { DepartamentoService } from "./departamento.service";
import { CreateDepartamento } from "./dto/create-departamento.dto";
import { Put,Delete } from "@nestjs/common/decorators";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { UpdateDepartamento } from "./dto/update-departamento.dto";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/Auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/Auth/guards/roles.guard";


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('departamento')
export class DepartamentoController {
    constructor (
        private readonly departamentoService: DepartamentoService,
    ) {}

    @Roles('admin','user')
    @Get(':id')
    findAll(@Param('id') id:number){
        return this.departamentoService.findAll(Number(id))
    }
    @Roles('admin','user')
    @Get(':id_empresa/:id')
    findOne(@Param('id_empresa') id_empresa: number, @Param('id') id:number){
        return this.departamentoService.findOne(Number(id_empresa),Number(id));
    }

    @Roles('admin')
    @Post()
    create(@Body() body: CreateDepartamento){
        return this.departamentoService.create(body);
    }

    @Roles('admin')
    @Put(':id_empresa/:id')
        update(
        @Param('id_empresa', ParseIntPipe) id_empresa: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateDepartamento,
        ) {
        return this.departamentoService.update(id, id_empresa, body);
    }

    @Roles('admin')
    @Delete(':id_empresa/:id')
        remove(
        @Param('id_empresa', ParseIntPipe) id_empresa: number,
        @Param('id', ParseIntPipe) id: number,
        ) {
        return this.departamentoService.remove(id, id_empresa);
    }
}