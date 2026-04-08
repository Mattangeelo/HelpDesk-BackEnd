import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DepartamentoService } from "./departamento.service";
import { CreateDepartamento } from "./dto/create-departamento.dto";



@Controller('departamento')
export class DepartamentoController {
    constructor (
        private readonly departamentoService: DepartamentoService,
    ) {}

    @Get(':id')
    findAll(@Param('id') id:number){
        return this.departamentoService.findAll(Number(id))
    }
    @Get(':id_empresa/:id')
    findOne(@Param('id_empresa') id_empresa: number, @Param('id') id:number){
        return this.findOne(Number(id_empresa),Number(id));
    }

    @Post()
    create(@Body() body: CreateDepartamento){
        return this.departamentoService.create(body);
    }
}