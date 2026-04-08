import { Body, Controller, Delete, Get, Param, Post, Put,UseGuards } from "@nestjs/common";
import { EmpresaService } from "./empresa.service";
import { CreateEmpresa } from "./dto/create-empresa.dto";
import { UpdateEmpresa } from "./dto/update-empresa.dto";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/Auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/Auth/guards/roles.guard";
import { Public } from "src/Auth/decorators/public.decorator";


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('empresa')
export class EmpresaController {
    constructor (
        private readonly empresaService: EmpresaService,
    ){}

    @Roles('admin','user')
    @Get()
    findAll() {
        return this.empresaService.findAll();
    }
    
    @Roles('admin','user')
    @Get(':id')
    findOne(@Param('id') id: number){
        return this.empresaService.findOne(Number(id));
    }
    @Public()
    @Post()
    create(@Body() body: CreateEmpresa) {
        return this.empresaService.create(body);
    }

    @Roles('admin')
    @Put(':id')
    update(
        @Param('id') id:number,
        @Body() body: UpdateEmpresa
    ){
        return this.empresaService.update(id,body);
    }

    @Roles('admin')
    @Delete(':id')
    delete(@Param('id') id:number){
        return this.empresaService.delete(id);
    }
}