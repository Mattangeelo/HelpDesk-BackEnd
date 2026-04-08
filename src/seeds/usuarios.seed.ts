import { Usuario } from "src/entity/usuario.entity";
import { DataSource } from "typeorm";


export async function seedUsuario(dataSource: DataSource) {
    const repo = dataSource.getRepository(Usuario);

    const usuarios = [
    ]
}