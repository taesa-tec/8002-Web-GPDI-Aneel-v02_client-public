import { ProjetosService } from './projetos.service';
import { Projeto, Empresa, ProjetoStatus, RegistroREFP, ProrrogarProjetoRequest } from '@app/models';
import { throwError } from 'rxjs';


abstract class ProjetoModule {
    constructor(protected id: number, protected service: ProjetosService) { }
}

class ProjetoTema extends ProjetoModule {
    get() {
        return this.service.getTema(this.id);
    }
}
class ProjetoEtapas extends ProjetoModule {
    get() {
        return this.service.getEtapas(this.id);
    }
}
class ProjetoProdutos extends ProjetoModule {
    get() {
        return this.service.getProdutos(this.id);
    }
}
class ProjetoEmpresas extends ProjetoModule {
    get() {
        return this.service.getEmpresas(this.id);
    }
}

class ProjetoRH extends ProjetoModule {
    get() {
        return this.service.getRH(this.id);
    }
    getAlocacao() {
        return this.service.getAlocacaoRH(this.id);
    }
}
class ProjetoRM extends ProjetoModule {
    get() {
        return this.service.getRecursoMaterial(this.id);
    }
    getAlocacao() {
        return this.service.getAlocacaoRM(this.id);
    }
}
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
            return throwError("O motivo não pode ser vazio");
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
            return throwError("A resposta não pode ser vazia");
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
export class ProjetoFacade implements Projeto {
    created: string;
    id: number;
    titulo: string;
    tipo: number;
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

    relations: {
        tema: ProjetoTema;
        etapas: ProjetoEtapas;
        produtos: ProjetoProdutos;
        empresas: ProjetoEmpresas;
        recursosHumanos: ProjetoRH;
        recursosMateriais: ProjetoRM;
        REFP: ProjetoREFP;
    };

    constructor(projeto: Projeto, protected service: ProjetosService) {
        Object.assign(this, projeto);
        this.relations = {
            tema: new ProjetoTema(this.id, this.service),
            etapas: new ProjetoEtapas(this.id, this.service),
            produtos: new ProjetoProdutos(this.id, this.service),
            empresas: new ProjetoEmpresas(this.id, this.service),
            recursosHumanos: new ProjetoRH(this.id, this.service),
            recursosMateriais: new ProjetoRM(this.id, this.service),
            REFP: new ProjetoREFP(this.id, this.service),
        };
    }

    prorrogar(prorrogacao: ProrrogarProjetoRequest) {
        return this.service.prorrogarProjeto(prorrogacao);
    }
    getOrcamentoEmpresas() {
        return this.service.getOrcamentoEmpresas(this.aplicabilidade.id);
    }
    getOrcamentoEtapas() {
        return this.service.getOrcamentoEtapas(this.id);
    }
    obterXmls() {
        return this.service.obterXmls(this.id);
    }
    obterLogDuto() {
        return this.service.obterLogDuto(this.id);
    }
    gerarXmlProjetoPed(versao: number) {
        return this.service.gerarXmlProjetoPed(this.id, versao);
    }
    gerarXmlInteresseExecucao(versao: number) {
        return this.service.gerarXmlInteresseExecucao(this.id, versao);
    }
    gerarXmlInicioExecucao(versao: number) {
        return this.service.gerarXmlInicioExecucao(this.id, versao);
    }
    gerarXmlProrrogacao(versao: number) {
        return this.service.gerarXmlProrrogacao(this.id, versao);
    }
    downloadXml(id) {
        return this.service.downloadXML(this.id, id);
    }
    orcamentoGerarCSV() {
        return this.service.exportarExtratoEmpresas(this.id);
    }
    extratoGerarCSV() {
        return this.service.exportarExtratoREFP(this.id);
    }

}
