import { PartialType } from "@nestjs/mapped-types";
import { CreateDepartamento } from "./create-departamento.dto";


export class UpdateEmpresa extends PartialType(CreateDepartamento) {}