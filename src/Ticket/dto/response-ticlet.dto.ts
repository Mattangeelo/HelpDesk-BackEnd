export class TicketResponse {
  id: number;
  codigo: string;
  titulo: string;
  descricao: string;
  status: string;
  categoria: string;
  prioridade: string;

  departamento: {
    id: number;
    nome: string;
  };

  usuario: {
    id: number;
    nome: string;
    email: string;
  };

  empresa: {
    id: number;
    razao_social: string;
    email: string;
  };
}