import {Provider} from '@angular/core';
import {PROPOSTA_LABELS} from '@app/pages/propostas/proposta/shared';

export const PropostaTexts = new Map<string, string>([
  ['alert-participacao-confirmado', 'O Fornecedor confirmou seu interesse em participar deste projeto.'],
  ['alert-clausulas-aceitas', 'O Fornecedor concordou com todas as cláusulas acima para participar deste projeto.'],
  ['contrato-finalizado', 'O Fornecedor marcou o contrato como finalizado. É possível que o fornecedor edite o mesmo até a data máxima de captação.'],
  ['plano-finalizado', 'O Fornecedor marcou o Plano de Trabalho como finalizado. É possível que o fornecedor edite o mesmo até a data máxima de captação.'],
  ['edit', 'Visualizar']
]);

export const PropostaTextsProvider: Provider = {
  provide: PROPOSTA_LABELS,
  useValue: PropostaTexts
};
