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
    EditEmpresaRequest
} from '@app/models';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjetosService {

    protected projetoCreatedSource = new Subject<Projeto>();

    projetoCreated = this.projetoCreatedSource.asObservable();
    status: ProjetoStatus[];

    constructor(private http: HttpClient) { }

    meusProjetos() {
        return this.http.get<Array<UserProjeto>>('UserProjetos/me');
    }

    getProjetos() {
        return this.http.get<Array<Projeto>>('Projetos');
    }
    usersProjeto(id: number) {
        return this.http.get<Projeto>(`Projetos/${id}/Usuarios`);
    }

    criarProjeto(projeto: CreateProjectRequest) {
        return this.http.post<ResultadoResponse>('Projetos', projeto);
    }

    getById(id: number) {
        return this.http.get<Projeto>(`Projetos/${id}`);
    }

    editar(projeto: Projeto) {
        return this.http.put<ResultadoResponse>(`Projetos`, projeto);
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
        return this.http.delete<any>(`Projeto/${id}/Etapas`);
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
        return this.http.get<any>(`Projeto/${id}/Empresas`);
    }

    delEmpresa(id: number) {
        return this.http.delete<any>(`Projeto/${id}/Empresas`);
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
        return this.http.delete<any>(`Projeto/${id}/RecursoHumanos`);
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
        return this.http.get<any>(`Projeto/${id}/AlocacaoRhs`);
    }

    delAlocacaoRH(id: number) {
        return this.http.delete<any>(`Projeto/${id}/AlocacaoRhs`);
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
        return this.http.delete<any>(`Projeto/${id}/RecursoMateriais`);
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
        return this.http.delete<any>(`Projeto/${id}/AlocacaoRms`);
    }

    /**
     * Extrato Financeiro Empresas
     */

    getExtratoFEm(id: number) {
        return this.http.get<any>(`Projeto/${id}/ExtratoEmpresas`);
    }

    /**
     * Extrato Financeiro Etapas
     */

    getExtratoFEt(id: number) {
        return this.http.get<any>(`Projeto/${id}/ExtratoEtapas`);
    }

    /**
     * Log Projeto Service
     */

    criarLogProjeto(logprojeto: CreateLogProjetoRequest) {
        return this.http.post<ResultadoResponse>('projeto/LogProjetos', logprojeto);
    }

    getLogPorjeto(id: number) {
        return this.http.get<any>(`projeto/${id}/Log`);
    }

    delLogPorjeto(id: number) {
        return this.http.delete<any>(`projeto/LogProjetos/${id}`);
    }
}
