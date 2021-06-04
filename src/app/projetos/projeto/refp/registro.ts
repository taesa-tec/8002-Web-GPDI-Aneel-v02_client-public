export interface Registro {
  id:                      number;
  tipo:                    string;
  projetoId:               number;
  status:                  number;
  tipoDocumento:           number;
  recurso:                 string;
  recursoHumanoId:         number | null;
  recursoMaterialId:       number | null;
  financiadoraId:          number;
  coExecutorFinanciadorId: null;
  recebedoraId:            number;
  coExecutorRecebedorId:   null;
  categoriaContabilId:     number | null;
  categoriaContabil:       string;
  financiador:             string;
  recebedor:               string;
  valor:                   number;
  quantidadeHoras:         number;
  custo:                   number;
}
