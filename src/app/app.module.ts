import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // ✅ import ConfigModule
import { DepartamentoModule } from 'src/Departamento/departamento.module';
import { EmpresaModule } from 'src/Empresa/empresa.module';
import { UsuarioModule } from 'src/Usuario/usuario.module';
import { Anexo } from 'src/entity/anexo.entity';
import { Departamento } from 'src/entity/departamento.entity';
import { Empresa } from 'src/entity/empresa.entity';
import { Ticket } from 'src/entity/ticket.entity';
import { Usuario } from 'src/entity/usuario.entity';
import { AuthModule } from 'src/Auth/auth.module';
import { TicketModule } from 'src/Ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'smartdesk',
      autoLoadEntities: true,
      entities: [
        Usuario,
        Empresa,
        Anexo,
        Ticket,
        Departamento
      ],
      synchronize: true,
    }),

    EmpresaModule,
    UsuarioModule,
    DepartamentoModule,
    AuthModule,
    TicketModule,
  ],
})
export class AppModule {}