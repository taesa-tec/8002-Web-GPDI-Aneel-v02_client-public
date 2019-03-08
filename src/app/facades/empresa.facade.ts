import { Empresa, EmpresaProjeto, UF } from '@app/models';
import { GenericFacade } from './generic.facade';

export class EmpresaFacade implements Empresa {
    id: number;
    nome: string;
    valor: string;
}

export class EmpresaProjetoFacade extends GenericFacade<EmpresaProjeto> implements EmpresaProjeto {
    id: number; projetoId: number;
    classificacao: number;
    classificacaoValor: string;
    catalogEmpresaId: number;
    catalogEmpresa?: Empresa;
    cnpj?: any;
    catalogEstadoId?: any;
    estado?: UF;
    razaoSocial?: string;
    nome: string;

    constructor(_empresa: EmpresaProjeto) {
        super(_empresa);
        Object.defineProperty(this, 'nome', {
            get: () => this.catalogEmpresa ? this.catalogEmpresa.nome : this.razaoSocial
        });
    }

}