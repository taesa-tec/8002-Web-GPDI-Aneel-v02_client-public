import {GenericFacade} from './generic.facade';
import {RecursoHumano} from '@app/models';
import {EmpresaProjetoFacade} from './empresa.facade';

export class RecursoHumanoFacade extends GenericFacade<RecursoHumano> implements RecursoHumano {
    cpf: string;
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
    protected _empresa: EmpresaProjetoFacade;
    empresa: EmpresaProjetoFacade;

    constructor(_recurso: RecursoHumano) {
        super(_recurso);
        this._empresa = new EmpresaProjetoFacade(_recurso.empresa);
        Object.defineProperty(this, 'empresa', {
            get: () => {
                return this._empresa;
            }, set: (value) => this._empresa = value

        });
    }
}
