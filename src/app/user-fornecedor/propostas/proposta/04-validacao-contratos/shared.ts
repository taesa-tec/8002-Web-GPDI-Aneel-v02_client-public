interface Parent {
  titulo: string;
  header: string;
  conteudo: string;
  footer: string;
  id: number;
}

export interface Contrato {
  parentId: number;
  parent: Parent;
  titulo: string;
  conteudo: null;
  revisoes: any[];
  finalizado: boolean;
  propostaId: number;
  id: number;
}


