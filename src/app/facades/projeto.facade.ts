import {throwError, Subject, Observable} from 'rxjs';
import {tap, map} from 'rxjs/operators';

import {Projeto, Empresa, ProjetoStatus, RegistroREFP, ProrrogarProjetoRequest, ResultadoResponse, XmlType} from '@app/models';
import {GenericFacade} from './generic.facade';
import {ProjetosService} from '@app/core/services/projetos.service';
import {EmpresaProjetoFacade} from './empresa.facade';
import {RecursoHumanoFacade} from './recurso-humano.facade';

const projetoComponents = [
    'Temas',
    'Produtos',
    'Etapas',
    'Empresas',
    'RecursoHumanos',
    'AlocacaoRhs',
    'RecursoMateriais',
    'AlocacaoRms',
    'RelatorioFinal',
    'ResultadoCapacitacao',
    'ResultadoProducao',
    'ResultadoInfra',
    'ResultadoIntelectual',
    'ResultadoSocioAmbiental',
    'ResultadoEconomico',
    'AtividadesGestao'
];

interface REST {
    Temas: ProjetoREST;
    Produtos: ProjetoREST;
    Etapas: ProjetoREST;
    Empresas: ProjetoREST;
    RecursoHumanos: ProjetoREST;
    AlocacaoRhs: ProjetoREST;
    RecursoMateriais: ProjetoREST;
    AlocacaoRms: ProjetoREST;
    RelatorioFinal: ProjetoREST;
    ResultadoCapacitacao: ProjetoREST;
    ResultadoProducao: ProjetoREST;
    ResultadoInfra: ProjetoREST;
    ResultadoIntelectual: ProjetoREST;
    ResultadoSocioAmbiental: ProjetoREST;
    ResultadoEconomico: ProjetoREST;
    AtividadesGestao: ProjetoREST;

}

abstract class ProjetoModule {
    constructor(protected id: number, protected service: ProjetosService) {

    }
}

export class ProjetoREST {
    constructor(protected path: string, protected projeto: ProjetoFacade, protected service: ProjetosService) {
    }

    listar<T>(): Observable<T> {
        try {
            if (this.service[this.path]) {
                return this.service[this.path].listar<T>(this.projeto.id);
            }
            return throwError('Relação não existente no serviço de projetos');
        } catch (error) {
            return throwError(error);
        }
    }

    criar(data: any): Observable<ResultadoResponse>;
    criar<T>(data: T): Observable<T> {
        try {
            if (this.service[this.path]) {
                return this.service[this.path].criar<T>(data);
            }
            return throwError('Relação não existente no serviço de projetos');
        } catch (error) {
            return throwError(error);
        }
    }

    obter<T>(id_item: number): Observable<T> {
        try {
            if (this.service[this.path]) {
                return this.service[this.path].obter<T>(id_item);
            }
            return throwError('Relação não existente no serviço de projetos');
        } catch (error) {
            return throwError(error);
        }
    }

    editar(data: any): Observable<ResultadoResponse>;
    editar<T>(data: T): Observable<T> {
        try {
            if (this.service[this.path]) {
                return this.service[this.path].editar(data);
            }
            return throwError('Relação não existente no serviço de projetos');
        } catch (error) {
            return throwError(error);
        }
    }

    remover(id_item: any): Observable<ResultadoResponse> {
        try {
            if (this.service[this.path]) {
                return this.service[this.path].remover(id_item);
            }
            return throwError('Relação não existente');
        } catch (error) {
            return throwError(error);
        }
    }

    clearCache() {
        try {
            if (this.service[this.path]) {
                return this.service[this.path].clearCache();
            }
            return throwError('Relação não existente');
        } catch (error) {
            return throwError(error);
        }
    }
}

/**
 * @deprecated Use o ProjetoREST
 */
class ProjetoTema extends ProjetoModule {
    get() {

        return this.service.getTema(this.id);
    }
}

/**
 * @deprecated Use o ProjetoREST
 */
class ProjetoEtapas extends ProjetoModule {
    get() {

        return this.service.getEtapas(this.id);
    }
}

/**
 * @deprecated Use o ProjetoREST
 */
class ProjetoProdutos extends ProjetoModule {
    get() {

        return this.service.getProdutos(this.id);
    }
}

/**
 * @deprecated Use o ProjetoREST
 */
class ProjetoEmpresas extends ProjetoModule {
    get() {

        return this.service.getEmpresas(this.id)
            .pipe(map(empresas => empresas.map(e => new EmpresaProjetoFacade(e))));
    }
}

/**
 * @deprecated Use o ProjetoREST
 */
class ProjetoRH extends ProjetoModule {
    get() {

        return this.service.getRH(this.id).pipe()
            .pipe(map(rh => rh.map(r => new RecursoHumanoFacade(r))));

    }

    getAlocacao() {

        return this.service.getAlocacaoRH(this.id);
    }
}

/**
 * @deprecated Use o ProjetoREST
 */
class ProjetoRM extends ProjetoModule {
    get() {

        return this.service.getRecursoMaterial(this.id);
    }

    getAlocacao() {
        return this.service.getAlocacaoRM(this.id);
    }
}

/**
 * @deprecated Use o ProjetoREST
 */
class ProjetoREFP extends ProjetoModule {


    registrosAprovados() {
        return this.service.listarRegistrosAprovados(this.id);
    }

    registrosReprovados() {
        return this.service.listarRegistrosReprovados(this.id);
    }

    registrosPendentes() {
        return this.service.listarRegistrosPendentes(this.id);
    }

    aprovarRegistro(id: number) {
        return this.service.editarRegistroREFP({
            id,
            status: 'Aprovado',
            obsInternas: []
        });
    }

    reprovarRegistro(id: number, motivo: string) {
        if (motivo.trim().length === 0) {
            return throwError('O motivo não pode ser vazio');
        }

        return this.service.editarRegistroREFP({
            id,
            status: 'Reprovado',
            obsInternas: [{
                texto: motivo
            }]
        });
    }

    reenviarAprovacaoRegistro(registro: RegistroREFP, respostas: string) {

        if (respostas.trim().length === 0) {
            return throwError('A resposta não pode ser vazia');
        }

        const requestData = Object.assign({}, registro, {
            status: 'Pendente',
            obsInternas: [{
                texto: respostas
            }]
        });

        return this.service.editarRegistroREFP(requestData);
    }

    removerRegistro(id: number) {
        return this.service.removerRegistroREFP(id);
    }
}

export class ProjetoFacade extends GenericFacade<Projeto> implements Projeto {
    created: string;
    id: number;
    titulo: string;
    tipo: number;
    tipoValor?: string;
    dataInicio?: any;
    codigo?: any;
    tituloDesc: string;
    numero: string;
    catalogEmpresaId: number;
    catalogEmpresa?: Empresa;
    catalogStatusId: number;
    catalogStatus?: ProjetoStatus;
    catalogSegmentoId?: any;
    catalogSegmento?: any;
    avaliacaoInicial?: any;
    compartResultados?: any;
    compartResultadosValor?: any;
    motivacao?: any;
    originalidade?: any;
    aplicabilidade?: any;
    relevancia?: any;
    razoabilidade?: any;
    pesquisas?: any;
    produtos?: any;
    recursosHumanos?: any;
    alocacoesRh?: any;
    recursosMateriais?: any;
    alocacoesRm?: any;
    etapas?: any;
    tema?: any;
    usersProjeto?: any;
    empresas?: any;

    isProposta: boolean;
    isIniciado: boolean;
    isEncerrado: boolean;

    relations: {
        tema: ProjetoTema;
        etapas: ProjetoEtapas;
        produtos: ProjetoProdutos;
        empresas: ProjetoEmpresas;
        recursosHumanos: ProjetoRH;
        recursosMateriais: ProjetoRM;
        REFP: ProjetoREFP;
    };
    REST: REST;

    onUpdate = new Subject<{ prop: string; value: any; prev: any }>();

    onSave = new Subject<Projeto>();

    constructor(_data: Projeto, protected _service: ProjetosService) {
        super(_data);
        this.relations = {
            tema: new ProjetoTema(this.id, this._service),
            etapas: new ProjetoEtapas(this.id, this._service),
            produtos: new ProjetoProdutos(this.id, this._service),
            empresas: new ProjetoEmpresas(this.id, this._service),
            recursosHumanos: new ProjetoRH(this.id, this._service),
            recursosMateriais: new ProjetoRM(this.id, this._service),
            REFP: new ProjetoREFP(this.id, this._service),
        };
        const rest = {};

        projetoComponents.forEach(path => {
            rest[path] = new ProjetoREST(path, this, this._service);
        });

        this.REST = <REST>rest;

        'Encerrado|Proposta|Iniciado'.split('|').forEach(status => {
            Object.defineProperty(this, `is${status}`, {
                get: () => this.catalogStatus && this.catalogStatus.status === status
            });
        });
    }

    get isPD() {
        return this.tipoValor === 'PD';
    }

    get isPG() {
        return this.tipoValor === 'PG';
    }

    save() {
        const projeto = Object.assign({}, this._data);
        if (this.id) {
            return this._service.editar(projeto).pipe(tap(r => this.onSave.next(projeto)));
        } else {
            return this._service.criarProjeto(projeto).pipe(tap(r => this.onSave.next(projeto)));
        }
    }

    delete() {
        if (this.id) {
            return this._service.removerProjeto(this.id);
        }
    }

    toRequest() {
        return Object.assign({}, this._data);
    }

    editarDataInicio(dataInicio) {
        return this._service.editarDataInicio({
            id: this.id,
            dataInicio
        }).pipe(tap(r => {
            this.dataInicio = dataInicio;
        }));
    }

    prorrogar(prorrogacao: ProrrogarProjetoRequest) {
        return this._service.prorrogarProjeto(prorrogacao);
    }

    getOrcamentoEmpresas() {
        return this._service.getOrcamentoEmpresas(this.id);
    }

    getOrcamentoEtapas() {
        return this._service.getOrcamentoEtapas(this.id);
    }

    getOrcamentoAtividades() {
        return this._service.getOrcamentoAtividades(this.id);
    }

    obterXmls() {
        return this._service.obterXmls(this.id);
    }

    obterLogDuto() {
        return this._service.obterLogDuto(this.id);
    }

    gerarXml(tipo: XmlType, versao: any) {
        return this._service.gerarXml(this.id, `S${versao}`, tipo);
    }

    gerarXmlProjetoPed(versao: number) {
        return this._service.gerarXmlProjetoPed(this.id, versao);
    }

    gerarXmlInteresseExecucao(versao: number) {
        return this._service.gerarXmlInteresseExecucao(this.id, versao);
    }

    gerarXmlInicioExecucao(versao: number) {
        return this._service.gerarXmlInicioExecucao(this.id, versao);
    }

    gerarXmlProrrogacao(versao: number) {
        return this._service.gerarXmlProrrogacao(this.id, versao);
    }

    downloadXml(id) {
        return this._service.downloadXML(this.id, id);
    }

    orcamentoGerarCSV() {
        return this._service.exportarExtratoEmpresas(this.id);
    }

    extratoGerarCSV() {
        return this._service.exportarExtratoREFP(this.id);
    }

}
