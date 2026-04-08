import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Public } from './decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Public()
  @Post('login/usuario')
  async loginUsuario(@Body() body: LoginDto) {
    const user = await this.authService.validateUsuario(body.email, body.senha);
    if (!user) throw new UnauthorizedException();
    return this.authService.login(user);
  }

  @Public()
  @Post('login/empresa')
  async loginEmpresa(@Body() body: LoginDto) {
    const empresa = await this.authService.validateEmpresa(body.email, body.senha);
    if (!empresa) throw new UnauthorizedException();
    return this.authService.login(empresa);
  }
}