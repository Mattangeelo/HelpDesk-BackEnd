import { Controller, Get } from "@nestjs/common";


@Controller('Usuario')

export class UsuarioController {
    @Get()
    hello(){
        return 'oi';
    }
}