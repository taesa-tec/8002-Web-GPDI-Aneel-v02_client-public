export interface Registro {
  id: number;
  tipo: 'RegistroFinanceiroRh' | 'RegistroFinanceiroRm';
  projetoId: number;
  mesReferencia: Date;
  atividadeRealizada: string;
  observacaoInterna: string;
  funcaoEtapa: string;
  nomeItem: null;
  beneficiado: null;
  cnpjBeneficiado: null;
  equipaLaboratorioExistente: null;
  equipaLaboratorioNovo: null;
  isNacional: null;
  status: string;
  tipoDocumento: string;
  numeroDocumento: string;
  dataDocumento: Date;
  recurso: string;
  recursoHumanoId: number;
  recursoMaterialId: null;
  financiadoraId: number;
  coExecutorFinanciadorId: null;
  recebedoraId: null;
  coExecutorRecebedorId: number;
  categoriaContabilId: null;
  categoriaContabil: string;
  financiador: string;
  recebedor: string;
  valor: number;
  custo: number;
  quantidadeHoras: number;
}

export interface RegistroObservacao {
  createdAt: Date;
  registroId: number;
  authorId: string;
  author: string;
  content: string;
  id: number;
}
