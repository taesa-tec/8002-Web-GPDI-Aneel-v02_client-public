import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    ExtratosEmpresas,
    ExtratosEtapas,
    FileUploaded,
    RegistroREFP,
    RegistroREFPEdit,
    LogProjeto,
    EmpresaProjeto
} from '@app/models';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { tap, share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProjetosService {

    protected projetoCreatedSource = new Subject<CreateProjectRequest>();
    protected projetoUpdatedSource = new Subject<Projeto>();
    protected projetoLoadedSource = new BehaviorSubject<Projeto>(null);

    projetoCreated = this.projetoCreatedSource.asObservable();
    projetoUpdated = this.projetoUpdatedSource.asObservable();
    projetoLoaded = this.projetoLoadedSource.asObservable();

    status: ProjetoStatus[];

    constructor(private http: HttpClient) { }

    meusProjetos() {
        return this.http.get<Array<UserProjeto>>('UserProjetos/me');
    }

    getProjetos() {
        return this.http.get<Array<Projeto>>('Projetos');
    }
    usersProjeto(id: number) {
        return this.http.get<Array<UserProjeto>>(`Projetos/${id}/Usuarios`);
    }

    criarProjeto(projeto: CreateProjectRequest) {
        return this.http.post<ResultadoResponse>('Projetos', projeto).pipe(tap(r => this.projetoCreatedSource.next(projeto)), share());
    }

    getById(id: number) {
        return this.http.get<Projeto>(`Projetos/${id}`).pipe(tap(p => this.projetoLoadedSource.next(p)), share());
    }

    editar(projeto: Projeto) {
        return this.http.put<ResultadoResponse>(`Projetos`, projeto).pipe(tap(result => {
            if (result.sucesso) {
                this.projetoUpdatedSource.next(projeto);
            }
        }));
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

    getExtratoEmpresas(id: number) {
        return this.http.get<ExtratosEmpresas>(`Projeto/${id}/ExtratoEmpresas`);
    }

    /**
     * Extrato Financeiro Etapas
     */

    getExtratoEtapas(id: number) {
        return this.http.get<ExtratosEtapas>(`Projeto/${id}/ExtratoEtapas`);
    }

    /**
     * Log Projeto Service
     */

    criarLogProjeto(logprojeto: CreateLogProjetoRequest) {
        return this.http.post<ResultadoResponse>('projeto/LogProjetos', logprojeto);
    }

    getLogPorjeto(id: number, args?: { [propName: string]: any }) {
        let query = '';
        if (args) {
            const urlParams = new URLSearchParams();
            for (let k in args) {
                if (args[k]) {
                    urlParams.append(k, args[k]);
                }
            }
            query = `?${urlParams.toString()}`;
        }
        return this.http.get<Array<LogProjeto>>(`projeto/${id}/Log${query}`);
    }

    delLogPorjeto(id: number) {
        return this.http.delete<any>(`projeto/LogProjetos/${id}`);
    }


    validarDados(id: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/XmlProjetoPed/ValidaDados`);
    }
    /**
     * @description Gerar XML's
     */
    obterXmls(id: number) {
        return this.http.get<Array<FileUploaded>>(`projeto/${id}/ObterXmls`);
    }
    gerarXmlProjetoPed(id: number, versao: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/XmlProjetoPed/${versao}`);
    }
    gerarXmlInteresseExecucao(id: number, versao: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/XmlInteresseExecucao/${versao}`);
    }
    gerarXmlInicioExecucao(id: number, versao: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/XmlInicioExecucao/${versao}`);
    }
    gerarXmlProrrogacao(id: number, versao: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/XmlProrrogacao/${versao}`);
    }

    /**
     * Registro REFP
     */
    criarRegistroREFP(registro: RegistroREFP) {
        return this.http.post<ResultadoResponse>(`projeto/RegistroFinanceiro`, registro);
    }
    editarRegistroREFP(registro: RegistroREFPEdit) {
        return this.http.put<ResultadoResponse>(`projeto/RegistroFinanceiro`, registro);
    }

    listarRegistroAprovados(id: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/RegistroFinanceiro/Aprovado`);
    }
    listarRegistroReprovados(id: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/RegistroFinanceiro/Reprovado`);
    }
    listarRegistroPendentes(id: number) {
        return this.http.get<ResultadoResponse>(`projeto/${id}/RegistroFinanceiro/Pendente`);
    }

}
