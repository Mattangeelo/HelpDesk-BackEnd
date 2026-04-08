import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Delete, 
  Query,
  UseGuards
} from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { UpdateStatusTicket } from "./dto/status-ticket.dto";
import { CreateTicket } from "./dto/create-ticket.dto";
import { UpdateTicket } from "./dto/update-ticket.dto";
import { JwtAuthGuard } from "src/Auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/Auth/guards/roles.guard";
import { Roles } from "src/Auth/decorators/roles.decorator";

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('ticket')
export class TicketController{
    constructor (
        private readonly ticketService: TicketService,
    ) {}

    @Roles('admin','user')
    @Get('empresa/:id_empresa')
    findAll(@Param('id_empresa') id_empresa:number){
        return this.ticketService.findAll(Number(id_empresa));
    }

    @Roles('admin','user')
    @Get('one/:id')
    findOne(@Param('id') id:number){
        return this.ticketService.findOne(Number(id));
    }

    @Roles('admin','user')
    @Post()
    create(@Body() data: CreateTicket){
        return this.ticketService.create(data);
    }

    @Roles('admin','user')
    @Patch(':id')
    update(
        @Param('id') id:number,
        @Body() data: UpdateTicket
    ){
        return this.ticketService.update(Number(id), data);
    }

    @Roles('admin','user')
    @Patch(':id/status')
    updateStatus(
        @Param('id') id: number,
        @Body() body: UpdateStatusTicket
    ){
        return this.ticketService.updateStatus(Number(id), body.status);
    }

    @Roles('admin','user')
    @Get() 
    findWithFilter(
    @Query('status') status?: string,
    @Query('id_empresa') id_empresa?: number
    ){
    return this.ticketService.findWithFilter({
        status,
        id_empresa: id_empresa ? Number(id_empresa) : undefined
    });
    }

    @Roles('admin','user')
    @Delete(':id')
    remove(@Param('id') id:number){
        return this.ticketService.remove(Number(id));
    }
}