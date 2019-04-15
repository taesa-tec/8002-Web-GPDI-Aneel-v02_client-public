import {RecursoHumano} from '@app/models';
import {EmpresaProjetoFacade} from '@app/facades/empresa.facade';
import {GenericFacade} from '@app/facades/generic.facade';

declare class RecusoHumanoFacade extends GenericFacade<RecursoHumano> implements RecursoHumano {
    cpf: string;
    empresa: EmpresaProjetoFacade;
    empresaId: number;
    funcao: number;
    funcaoValor: string;
    gerenteProjeto: boolean;
    id: number;
    nacionalidade: number;
    nacionalidadeValor: string;
    nomeCompleto: string;
    passaporte: any;
    projetoId: number;
    titulacao: number;
    titulacaoValor: string;
    urlCurriculo: string;
    valorHora: number;
}
