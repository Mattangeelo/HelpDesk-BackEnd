import { seedEmpresa } from './empresas.seed';
import { Empresa } from '../entity/empresa.entity';
import { DataSource } from 'typeorm';
import { Usuario } from '../entity/usuario.entity';
import { Ticket } from '../entity/ticket.entity';
import { Anexo } from '../entity/anexo.entity';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'smartdesk',
    entities: [Empresa,Usuario,Ticket,Anexo],
    synchronize: false,
});
async function run() {
  await AppDataSource.initialize();

  await seedEmpresa(AppDataSource);

  await AppDataSource.destroy();
}

run();