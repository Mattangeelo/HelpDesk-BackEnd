import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../Usuario/usuario.service';
import { EmpresaService } from 'src/Empresa/empresa.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService,
    private jwtService: JwtService,
  ) {}

  async validateEmpresa(email: string, senha: string) {
      const empresa = await this.empresaService.findByEmail(email);
      
      if (!empresa) {
          console.log('Motivo: E-mail não encontrado no banco.');
          return null;
      }
      const senhaValida = await bcrypt.compare(senha, empresa.senha);

      if (empresa && senhaValida) {
        const { senha, ...result } = empresa;
        return { ...result, role: 'admin' }; 
      }
      return null;
  }
  async validateUsuario(email: string, senha: string) {

    const usuario = await this.usuarioService.findByEmail(email);

    if (!usuario) {
      return null;
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return null;
    }

    if (!usuario.aceito) {
      throw new UnauthorizedException(
        'Seu cadastro ainda não foi aprovado pela empresa'
      );
    }

    const { senha: _, ...result } = usuario;

    return { ...result, role: 'user' };
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        razao_social: user.razao_social || null,
        nome: user.nome || null,
        id_empresa: user.empresa?.id || user.id,
      }
    };
  }
}