import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
    CreateProjectRequest,
    Projeto, ResultadoResponse,
    ProjetoStatus, UserProjeto, CreateTemaRequest, EditTemaRequest,
    Tema, TemaProjeto, CreateProdutoRequest, EditProduto,
    CriarEtapaRequest, EditEtapaRequest, CreateEmpresaRequest,
    CreateRHRequest, EditRH, CreateAlocacaoRHRequest, EditAlocacaoRH,
    CreateRecursoMaterialRequest, EditRecursoMaterial, CreateAlocacaoRMRequest,
    CreateLogProjetoRequest,
    Produto,
    ProjetoDataInicio,
    Etapa,
    EditEmpresaRequest,
    OrcamentosEmpresas,
    ExtratosEtapas,
    FileUploaded,
    RegistroREFP,
    RegistroREFPEdit,
    LogProjeto,
    EmpresaProjeto,
    TotalLog,
    ExtratosEmpresas,
    ProrrogarProjetoRequest,
    XmlType
} from '@app/models';
import {Subject, Observable, BehaviorSubject, of} from 'rxjs';
import {tap, share, map} from 'rxjs/operators';
import {ProjetoFacade} from '@app/facades';
import {FileService} from '@app/core/services/file.service';
import {RequestCacheService} from '@app/request-cache.service';

class ProjetoREST {

    protected itemCache: Map<any, any> = new Map<any, any>();
    protected listCache: Map<any, any> = new Map<any, any>();

    constructor(protected projetoComponentPath: string, protected http: HttpClient) {

    }

    clearCache() {
        this.itemCache.clear();
        this.listCache.clear();
    }

    listar(id_projeto: any): Observable<any>;
    listar<T>(id_projeto: any) {
        if (this.listCache.has(id_projeto)) {
            return of(this.listCache.get(id_projeto));
        }

        return this.http.get<T>(`projeto/${id_projeto}/${this.projetoComponentPath}`).pipe(tap(item => {
            this.listCache.set(id_projeto, item);
        }));
    }

    criar(data: any): Observable<any>;
    criar<D>(data: D) {
        this.itemCache.clear();
        this.listCache.clear();
        return this.http.post<ResultadoResponse>(`projeto/${this.projetoComponentPath}`, data);
    }

    obter(id_item: number): Observable<any>;
    obter<T>(id_item: number) {

        if (this.itemCache.has(id_item)) {
            return of(this.itemCache.get(id_item));
        }

        return this.http.get<T>(`projeto/${this.projetoComponentPath}/${id_item}`).pipe(tap(item => {
            this.itemCache.set(id_item, item);
        }));
    }

    editar(data: any): Observable<any>;
    editar<D>(data: D) {
        this.itemCache.clear();
        return this.http.put<ResultadoResponse>(`projeto/${this.projetoComponentPath}`, data);
    }

    remover(id_item: any) {
        this.itemCache.clear();
        return this.http.delete<ResultadoResponse>(`projeto/${this.projetoComponentPath}/${id_item}`);
    }


}


@Injectable({
    providedIn: 'root'
})
export class ProjetosService {
    AtividadesGestao: ProjetoREST;
    AlocacaoRhs: ProjetoREST;
    AlocacaoRms: ProjetoREST;
    Etapas: ProjetoREST;
    Empresas: ProjetoREST;
    Produtos: ProjetoREST;
    RecursoHumanos: ProjetoREST;
    RecursoMateriais: ProjetoREST;
    RelatorioFinal: ProjetoREST;
    ResultadoCapacitacao: ProjetoREST;
    ResultadoProducao: ProjetoREST;
    ResultadoInfra: ProjetoREST;
    ResultadoIntelectual: ProjetoREST;
    ResultadoSocioAmbiental: ProjetoREST;
    ResultadoEconomico: ProjetoREST;
    status: ProjetoStatus[];
    Temas: ProjetoREST;
    protected CurrentProject: ProjetoFacade;
    protected CurrentAccess: { nome: string; valor: string };

    constructor(protected http: HttpClient, protected fileService: FileService, protected requestCache: RequestCacheService) {
        const rest = [
            'Temas', 'Produtos', 'Etapas', 'Empresas', 'RecursoHumanos', 'AlocacaoRhs',
            'RecursoMateriais', 'AlocacaoRms', 'RelatorioFinal', 'ResultadoCapacitacao', 'ResultadoProducao',
            'ResultadoInfra', 'ResultadoIntelectual', 'ResultadoSocioAmbiental', 'ResultadoEconomico', 'AtividadesGestao'
        ];

        rest.forEach(path => {
            const projetoRest = new ProjetoREST(path, this.http);
            Object.defineProperty(this, path, {get: () => projetoRest});
        });
        console.log('ProjetosService Ok');
    }

    async getCurrent(): Promise<ProjetoFacade> {
        return new Promise<ProjetoFacade>(resolve => resolve(this.CurrentProject));
    }

    async setCurrent(id: number) {
        const projeto = await this.getById(id).toPromise();
        this.CurrentProject = new ProjetoFacade(projeto, this);
        this.CurrentAccess = null;
    }

    async getCurrentAccess() {
        if (this.CurrentAccess === undefined || this.CurrentAccess === null) {
            const p = await this.getCurrent();
            this.CurrentAccess = await this.getMyAccessProject(p.id).toPromise();
        }
        return this.CurrentAccess;
    }

    meusProjetos() {
        return this.http.get<Array<Projeto>>('UserProjetos/me');
    }

    projetoUsers(permissoes: Array<UserProjeto>) {
        return this.http.post<ResultadoResponse>('ProjetoUsers', permissoes);
    }

    getProjetos() {
        return this.http.get<Array<Projeto>>('Projetos');
    }

    usersProjeto(id: number) {
        return this.http.get<Array<UserProjeto>>(`Projetos/${id}/Usuarios`);
    }

    criarProjeto(projeto: CreateProjectRequest) {
        return this.http.post<ResultadoResponse>('Projetos', projeto).pipe(share());
    }

    getById(id: number) {
        return this.http.get<Projeto>(`Projetos/${id}`);
    }

    getMyAccessProject(id: number) {
        return this.http.get<{ nome: string; valor: string }>(`Projetos/${id}/me`);
    }

    editar(projeto: Projeto) {
        projeto.catalogEmpresaId = parseInt(String(projeto.catalogEmpresaId), 10);
        return this.http.put<ResultadoResponse>(`Projetos`, projeto);
    }

    removerProjeto(id) {
        return this.http.delete<ResultadoResponse>(`Projetos/${id}`);
    }

    editarDataInicio(projetoDataInicio: ProjetoDataInicio) {
        return this.http.put<ResultadoResponse>(`Projetos/dataInicio`, projetoDataInicio);
    }

    // Temas
    getTema(id: number) {
        return this.http.get<TemaProjeto>(`Projeto/${id}/Temas`);
    }

    criarTema(tema: CreateTemaRequest) {
        return this.http.post<ResultadoResponse>('projeto/Temas', tema);
    }

    editTema(tema: EditTemaRequest) {
        return this.http.put<ResultadoResponse>('projeto/Temas', tema);
    }

    deleteTema(id: number) {
        return this.http.delete<ResultadoResponse>(`Projeto/Temas/${id}`);
    }


    // Produtos
    criarProduto(produto: CreateProdutoRequest) {
        return this.http.post<ResultadoResponse>('projeto/Produtos', produto);
    }

    editarProduto(produto: EditProduto) {
        return this.http.put<ResultadoResponse>('projeto/Produtos', produto);
    }

    getProdutos(id: number) {
        return this.http.get<Array<Produto>>(`Projeto/${id}/Produtos`);
    }

    delProduto(id: number) {
        return this.http.delete<ResultadoResponse>(`projeto/Produtos/${id}`);
    }

    /**
     * Etapa Service
     */

    criarEtapa(etapa: CriarEtapaRequest) {
        return this.http.post<ResultadoResponse>('projeto/Etapas', etapa);
    }

    editarEtapa(etapa: EditEtapaRequest) {
        return this.http.put<ResultadoResponse>('projeto/Etapas', etapa);
    }

    getEtapas(id: number) {
        return this.http.get<Array<Etapa>>(`Projeto/${id}/Etapas`);
    }

    delEtapa(id: number) {
        return this.http.delete<any>(`Projeto/Etapas/${id}`);
    }

    /**
     * Empresa Service
     */

    criarEmpresa(empresa: CreateEmpresaRequest) {
        return this.http.post<ResultadoResponse>('projeto/Empresas', empresa);
    }

    editarEmpresa(empresa: EditEmpresaRequest) {
        return this.http.put<ResultadoResponse>('projeto/Empresas', empresa);
    }

    getEmpresas(id: number) {
        return this.http.get<Array<EmpresaProjeto>>(`Projeto/${id}/Empresas`);

    }

    delEmpresa(id: number) {
        return this.http.delete<any>(`Projeto/Empresas/${id}`);
    }

    /**
     * Recurso Humano Service
     */

    criarRH(rh: CreateRHRequest) {
        return this.http.post<ResultadoResponse>('projeto/RecursoHumanos', rh);
    }

    editarRH(rh: EditRH) {
        return this.http.put<ResultadoResponse>('projeto/RecursoHumanos', rh);
    }

    getRH(id: number) {
        return this.http.get<any>(`Projeto/${id}/RecursoHumanos`);
    }

    delRH(id: number) {
        return this.http.delete<any>(`Projeto/RecursoHumanos/${id}`);
    }

    /**
     * Alocação Recurso Humano Service
     */

    criarAlocacaoRH(alocacaorh: CreateAlocacaoRHRequest) {
        return this.http.post<ResultadoResponse>('projeto/AlocacaoRhs', alocacaorh);
    }

    editarAlocacaoRH(alocacaorh: EditAlocacaoRH) {
        return this.http.put<ResultadoResponse>('projeto/AlocacaoRhs', alocacaorh);
    }

    getAlocacaoRH(id: number) {
        return this.http.get<Array<any>>(`Projeto/${id}/AlocacaoRhs`);
    }

    delAlocacaoRH(id: number) {
        return this.http.delete<any>(`Projeto/AlocacaoRhs/${id}`);
    }

    /**
     * Recurso Material Service
     */

    criarRecursoMaterial(recursomaterial: CreateRecursoMaterialRequest) {
        return this.http.post<ResultadoResponse>('projeto/RecursoMateriais', recursomaterial);
    }

    editarRecursoMaterial(recursomaterial: EditRecursoMaterial) {
        return this.http.put<ResultadoResponse>('projeto/RecursoMateriais', recursomaterial);
    }

    getRecursoMaterial(id: number) {
        return this.http.get<any>(`Projeto/${id}/RecursoMateriais`);
    }

    delRecursoMaterial(id: number) {
        return this.http.delete<any>(`Projeto/RecursoMateriais/${id}`);
    }

    /**
     * Alocacao Recurso Material Service
     */

    criarAlocacaoRM(alocacaorm: CreateAlocacaoRMRequest) {
        return this.http.post<ResultadoResponse>('projeto/AlocacaoRms', alocacaorm);
    }

    editarAlocacaoRM(alocacaorm: EditRecursoMaterial) {
        return this.http.put<ResultadoResponse>('projeto/AlocacaoRms', alocacaorm);
    }

    getAlocacaoRM(id: number) {
        return this.http.get<any>(`Projeto/${id}/AlocacaoRms`);
    }

    delAlocacaoRM(id: number) {
        return this.http.delete<any>(`Projeto/AlocacaoRms/${id}`);
    }

    /**
     * Extrato Financeiro Empresas
     */

    getOrcamentoEmpresas(id: number) {
        return this.http.get<OrcamentosEmpresas>(`Projeto/${id}/ExtratoEmpresas`);
    }

    exportarExtratoEmpresas(id: number) {
        return this.http.get(`Projeto/${id}/ExtratoEmpresas/exportar`, {
            responseType: 'blob',
            observe: 'response',
        }).pipe(tap(filedata => {
            this.fileService.download(new File([filedata.body], `projeto-${id}-extrato-financeiro.xlsx`));
        }));
    }

    /**
     * Extrato Financeiro Etapas
     */

    getOrcamentoEtapas(id: number) {
        return this.http.get<ExtratosEtapas>(`Projeto/${id}/ExtratoEtapas`);
    }

    /**
     * Extrato Financeiro Atividades
     */
    getOrcamentoAtividades(id: number) {
        return this.http.get<any>(`Projeto/${id}/ExtratoAtividades`);
    }

    /**
     * Log Projeto Service
     */

    criarLogProjeto(logprojeto: CreateLogProjetoRequest) {
        console.log({logprojeto});
        return of(true); // this.http.post<ResultadoResponse>('projeto/LogProjetos', logprojeto);
    }

    getLogPorjeto(id: number, args?: { [propName: string]: any }) {
        let query = '';
        if (args) {
            const urlParams = new URLSearchParams();
            for (const k in args) {
                if (args[k]) {
                    urlParams.append(k, args[k]);
                }
            }
            query = `?${urlParams.toString()}`;
        }
        return this.http.get<TotalLog>(`projeto/${id}/Log${query}`);
    }

    delLogProjeto(id: number) {
        return this.http.delete<any>(`projeto/LogProjetos/${id}`);
    }


    validarDados(id: number, tipo: XmlType = XmlType.ProjetoPed) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/Xml/${tipo}/ValidaDados`);
    }

    obterXmls(id: number) {
        return this.http.get<Array<FileUploaded>>(`projeto/${id}/ObterXmls`);
    }

    obterLogDuto(id: number) {
        return this.http.get<Array<FileUploaded>>(`upload/${id}/obterlogduto`);
    }

    async gerarXml(projeto_id: number, versao: string, tipo: XmlType = XmlType.ProjetoPed) {


        const result = await this.validarDados(projeto_id, tipo).toPromise();

        if (result.sucesso) {

            const xml_result = await this.http.get<ResultadoResponse>(`projeto/${projeto_id}/Xml/${tipo}/${versao}`).toPromise();

            if (xml_result.sucesso) {

                const xmls = await this.obterXmls(projeto_id).toPromise();
                const file = xmls.find(f => f.id === parseInt(xml_result.id, 10));

                if (file) {
                    this.fileService.download(file);
                    return;
                } else {
                    throw new Error('Arquivo não encontrado');
                }

            } else {
                throw new Error(xml_result.inconsistencias.join(', '));
            }

        }
        throw new Error(result.inconsistencias.join('<br />'));


    }

    gerarXmlProjetoPed(id: number, versao: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/Xml/ProjetoPed/${versao}`);
    }

    gerarXmlInteresseExecucao(id: number, versao: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/Xml/InteresseProjetoPed/${versao}`);
    }

    gerarXmlInicioExecucao(id: number, versao: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/Xml/InicioExecucaoProjeto/${versao}`);
    }

    gerarXmlProrrogacao(id: number, versao: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/Xml/ProrrogaExecucaoProjeto/${versao}`);
    }

    gerarXmlRelatorioFinalPed(id: number, versao: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/Xml/RelatorioFinalPed/${versao}`);
    }

    gerarXmlRelatorioAuditoriaPed(id: number, versao: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/Xml/RelatorioAuditoriaPed/${versao}`);
    }

    downloadXML(projeto_id, file_id) {
        const o = new Subject<boolean>();
        this.requestCache.clear();
        this.obterXmls(projeto_id).subscribe(result => {
            const file = result.find(f => f.id === parseInt(file_id, 10));
            if (file) {
                this.fileService.download(file);

                o.next(true);
            }
            o.next(false);
        }, error => {
            o.error(error);
        });

        return o.asObservable();
    }


    prorrogarProjeto(prorrogar: ProrrogarProjetoRequest) {
        return this.http.post<ResultadoResponse>(`projetos/prorrogar`, prorrogar);
    }

    /**
     * Registro REFP
     */
    criarRegistroREFP(registro: RegistroREFP) {
        return this.http.post<ResultadoResponse>(`projeto/RegistroFinanceiro`, registro);
    }

    editarRegistroREFP(registro: RegistroREFP | RegistroREFPEdit) {
        return this.http.put<ResultadoResponse>(`projeto/RegistroFinanceiro`, registro);
    }

    removerRegistroREFP(id: number) {
        return this.http.delete<ResultadoResponse>(`projeto/RegistroFinanceiro/${id}`);
    }

    listarRegistrosAprovados(id: number) {
        return this.http.get<Array<RegistroREFP>>(`projeto/${id}/RegistroFinanceiro/Aprovado`);
    }

    listarRegistrosReprovados(id: number) {
        return this.http.get<Array<RegistroREFP>>(`projeto/${id}/RegistroFinanceiro/Reprovado`);
    }

    listarRegistrosPendentes(id: number) {
        return this.http.get<Array<RegistroREFP>>(`projeto/${id}/RegistroFinanceiro/Pendente`);
    }

    extratoREFP(id: number) {
        return this.http.get<ExtratosEmpresas>(`projeto/${id}/ExtratoREFP`);
    }

    exportarExtratoREFP(id: number) {
        this.http.get(`projeto/${id}/ExtratoREFP/exportar`, {
            responseType: 'blob'
        }).subscribe(filedata => {
            this.fileService.download(new File([filedata], `projeto-${id}-extrato-financeiro.xlsx`));
        }, error => {
            console.error(error);
        });
    }
}
