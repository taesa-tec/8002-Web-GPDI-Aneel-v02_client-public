import { Dictionary } from 'lodash';

export enum DemandaEtapa {
  Elaboracao = 0,
  PreAprovacao = 1,
  RevisorPendente = 2,
  AprovacaoRevisor = 3,
  AprovacaoCoordenador = 4,
  AprovacaoGerente = 5,
  AprovacaoDiretor = 6,
  Captacao = 7
}

export enum DemandaEtapaStatus {
  EmElaboracao,
  Reprovada,
  ReprovadaPermanente,
  Aprovada,
  Concluido,
  Pendente,
  Cancelada
}
export const DemandaEtapaStatusText: Dictionary<string> = {};
DemandaEtapaStatusText[DemandaEtapaStatus.EmElaboracao] = "Andamento";
DemandaEtapaStatusText[DemandaEtapaStatus.Reprovada] = "Reprovada";
DemandaEtapaStatusText[DemandaEtapaStatus.ReprovadaPermanente] = "Reprovada";
DemandaEtapaStatusText[DemandaEtapaStatus.Aprovada] = "Aprovada";
DemandaEtapaStatusText[DemandaEtapaStatus.Concluido] = "Concluído";
DemandaEtapaStatusText[DemandaEtapaStatus.Pendente] = "Pendente";
DemandaEtapaStatusText[DemandaEtapaStatus.Cancelada] = "Cancelada";

export interface DemandaEtapaItem {
  etapa: DemandaEtapa;
  titulo: string;
}

export const DemandaEtapaItems: Array<DemandaEtapaItem> = [
  {
    etapa: DemandaEtapa.Elaboracao,
    titulo: "Elaboração"
  },
  {
    etapa: DemandaEtapa.PreAprovacao,
    titulo: "Pré-Aprovação Superior Direto"
  },
  {
    etapa: DemandaEtapa.RevisorPendente,
    titulo: "Revisor Pendente"
  },
  {
    etapa: DemandaEtapa.AprovacaoRevisor,
    titulo: "Aprovação Revisor"
  },
  {
    etapa: DemandaEtapa.AprovacaoCoordenador,
    titulo: "Aprovação Coordenador P&D"
  },
  {
    etapa: DemandaEtapa.AprovacaoGerente,
    titulo: "Aprovação Gerente P&D"
  },
  {
    etapa: DemandaEtapa.AprovacaoDiretor,
    titulo: "Aprovação Diretor P&D"
  },
];
