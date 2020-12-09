import {Dictionary} from 'lodash';

export enum CaptacaoEtapa {
    Pendente,
    EmElaboracao,
    Aberta,
    Encerrada,
    Cancelada
}

export const CaptacaoEtapaText: Dictionary<string> = {};
CaptacaoEtapaText[CaptacaoEtapa.Pendente] = 'pendente';
CaptacaoEtapaText[CaptacaoEtapa.EmElaboracao] = 'elaboracao';
CaptacaoEtapaText[CaptacaoEtapa.Aberta] = 'aberta';
CaptacaoEtapaText[CaptacaoEtapa.Encerrada] = 'encerrada';
CaptacaoEtapaText[CaptacaoEtapa.Cancelada] = 'cancelada';
