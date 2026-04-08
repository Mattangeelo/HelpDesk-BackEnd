import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";


export class AceitoUsuario {

    @IsNumber({}, { message: 'ID do Usuario deve ser um número' })
    @IsNotEmpty({ message: 'Usuario é obrigatório' })
    id_usuario: number;

    @IsNumber({}, { message: 'ID da empresa deve ser um número' })
    @IsNotEmpty({ message: 'Empresa é obrigatória' })
    id_empresa: number;
    
    @IsBoolean()
    @IsNotEmpty({ message: 'Campo aceito é obrigatório' })
    aceito: boolean;
}