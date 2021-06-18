export interface ExtratoEmpresa {
  nome:       string;
  codigo:     string;
  previsto:   number;
  realizado:  number;
  desvio:     number;
  categorias: Categoria[];
}

export interface Categoria {
  previsto:  number;
  realizado: number;
  nome:      string;
  codigo:    string;
  desvio:    number;
  orcamento: Orcamento[];
  registros: Registro[];
}

export interface Orcamento {
  id:                      number;
  projetoId:               number;
  tipo:                    string;
  etapaId:                 number;
  ordem:                   number;
  mes:                     number | null;
  recursoHumanoId:         number | null;
  recursoMaterialId:       number | null;
  categoriaContabil:       string;
  categoriaContabilCodigo: string;
  recurso:                 string;
  financiadorCode:         string;
  empresaFinanciadoraId:   number | null;
  coExecutorFinanciadorId: number | null;
  financiador:             string;
  recebedoraId:            number | null;
  coExecutorRecebedorId:   number | null;
  recebedor:               string;
  quantidade:              number;
  custo:                   number;
  total:                   number;
}

export interface Registro {
  id:                         number;
  tipo:                       string;
  atividadeRealizada:         null | string;
  funcaoEtapa:                null | string;
  etapa:                      number;
  especificaoTecnica:         null | string;
  nomeItem:                   null | string;
  beneficiado:                null | string;
  cnpjBeneficiado:            null | string;
  equipaLaboratorioExistente: boolean | null;
  equipaLaboratorioNovo:      boolean | null;
  isNacional:                 boolean | null;
  mesReferencia:              Date;
  projetoId:                  number;
  status:                     number;
  tipoDocumento:              number;
  numeroDocumento:            string;
  dataDocumento:              Date;
  recurso:                    string;
  recursoHumanoId:            number | null;
  recursoMaterialId:          number | null;
  financiadoraId:             number;
  coExecutorFinanciadorId:    null;
  financiadorCode:            string;
  recebedoraId:               number | null;
  coExecutorRecebedorId:      number | null;
  categoriaContabilId:        number | null;
  categoriaContabil:          string;
  categoriaContabilCodigo:    string;
  financiador:                string;
  recebedor:                  string;
  valor:                      number;
  quantidadeHoras:            number;
  custo:                      number;
}
