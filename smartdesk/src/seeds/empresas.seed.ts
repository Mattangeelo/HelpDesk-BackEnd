import { Empresa } from '../entity/empresa.entity';
import { DataSource } from 'typeorm';

export async function seedEmpresa(dataSource: DataSource) {
  const repo = dataSource.getRepository(Empresa);

  const empresas = [
    {
      razao_social: 'Empresa Teste LTDA',
      cnpj: '17.309.337/0001-88',
    },
  ];

  for (const emp of empresas) {
    const existe = await repo.findOne({
      where: { cnpj: emp.cnpj },
    });

    if (!existe) {
      const empresa = repo.create(emp);
      await repo.save(empresa);
    }
  }

  console.log('Seed Empresa executado!');
}