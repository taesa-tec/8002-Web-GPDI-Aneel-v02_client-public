import { ProjetosService } from './projetos.service';
import { Projeto, Empresa, ProjetoStatus } from '@app/models';


abstract class ProjetoModule {
    constructor(public id: number, protected service: ProjetosService) { }
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
        return this.service.listarRegistroAprovados(this.id);
    }
    registrosReprovados() {
        return this.service.listarRegistroReprovados(this.id);
    }
    registrosPendentes() {
        return this.service.listarRegistroPendentes(this.id);
    }
}
export class ProjetoFacade {

    data: Projeto;

    tema: ProjetoTema;
    etapas: ProjetoEtapas;
    produtos: ProjetoProdutos;
    empresas: ProjetoEmpresas;
    recursosHumanos: ProjetoRH;
    recursosMateriais: ProjetoRM;
    REFP: ProjetoREFP;

    constructor(public projeto: Projeto, protected service: ProjetosService) {
        this.tema = new ProjetoTema(this.projeto.id, this.service);
        this.etapas = new ProjetoEtapas(this.projeto.id, this.service);
        this.produtos = new ProjetoProdutos(this.projeto.id, this.service);
        this.empresas = new ProjetoEmpresas(this.projeto.id, this.service);
        this.recursosHumanos = new ProjetoRH(this.projeto.id, this.service);
        this.recursosMateriais = new ProjetoRM(this.projeto.id, this.service);
        this.REFP = new ProjetoREFP(this.projeto.id, this.service);
    }

    getOrcamentoEmpresas() {
        this.service.getExtratoEmpresas(this.projeto.id);
    }

    getOrcamentoEtapas() {
        this.service.getExtratoEtapas(this.projeto.id);
    }

    obterXmls() {
        return this.service.obterXmls(this.projeto.id);
    }
    gerarXmlProjetoPed(versao: number) {
        return this.service.gerarXmlProjetoPed(this.projeto.id, versao);
    }
    gerarXmlInteresseExecucao(versao: number) {
        return this.service.gerarXmlInteresseExecucao(this.projeto.id, versao);
    }
    gerarXmlInicioExecucao(versao: number) {
        return this.service.gerarXmlInicioExecucao(this.projeto.id, versao);
    }
    gerarXmlProrrogacao(versao: number) {
        return this.service.gerarXmlProrrogacao(this.projeto.id, versao);
    }

}
