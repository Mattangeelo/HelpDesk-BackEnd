import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresa } from './create-empresa.dto';

export class UpdateEmpresa extends PartialType(CreateEmpresa) {}