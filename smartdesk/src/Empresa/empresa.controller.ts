import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EmpresaService } from "./empresa.service";
import { CreateEmpresa } from "./dto/create-empresa.dto";
import { UpdateEmpresa } from "./dto/update-empresa.dto";


@Controller('empresa')
export class EmpresaController {
    constructor (
        private readonly empresaService: EmpresaService,
    ){}

    @Get()
    findAll() {
        return this.empresaService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number){
        return this.empresaService.findOne(Number(id));
    }

    @Post()
    create(@Body() body: CreateEmpresa) {
        return this.empresaService.create(body);
    }

    @Put(':id')
    update(
        @Param('id') id:number,
        @Body() body: UpdateEmpresa
    ){
        return this.empresaService.update(id,body);
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.empresaService.delete(id);
    }
}