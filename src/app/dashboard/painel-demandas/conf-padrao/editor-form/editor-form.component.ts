import { AppService } from '@app/services/app.service';
import { CONFIG } from './config-editor';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { LoadingComponent } from '@app/core/shared/app-components/loading/loading.component';


@Component({
  selector: 'app-editor-form',
  templateUrl: './editor-form.component.html',
  styleUrls: ['./editor-form.component.scss']
})
export class EditorFormComponent implements OnInit {

  formd: FormGroup;
  valorDoCampo = '';
  config = CONFIG;


  constructor(private fb: FormBuilder, private app: AppService, private rota: Router) {
  }
  @ViewChild(LoadingComponent) loading;
  ngOnInit() {
    this.configForm();
  }


  configForm() {
    this.formd = this.fb.group({
      apresentacaoObjetivo: ['A Transmissora Aliança de Energia Elétrica S.A (“TAESA”) apresenta, neste documento, as premissas para elaboração de proposta técnica/comercial para contratação de instituições especializadas em execução de projetos de Pesquisa e Desenvolvimento (“P&D”) regulados pela ANEEL.'],
      tituloBreve: ['Descreva um título breve do Problema que busca solução (3 palavras no máximo)'],
      descricaoProblema: ['Descreva detalhadamente o problema no qual busca solução'],
      resultadoPesquisa: ['Descreva detalhadamente os resultados esperados com a pesquisa'],
      produtoPrincipal: ['Descreva detalhadamente o produto principal.'],
      produtoComplementarA: ['Descreva detalhadamente o produto complementar'],
      produtosAcademicos: ['Com vistas ao completo atendimento ao quesito de originalidade da avaliação ANEEL, requisita-se o desenvolvimento dos seguintes produtos: '],
      resultadoEsperadoPesquisa: [''],
      outrosProdutos: ['O projeto deve atender, mas não se limitar, aos produtos e soluções aqui apresentados. A executora está livre para sugerir outras soluções, sistemas e integrações que complementem o objeto proposto.'],
      internalizacaoConhecimentoCientifico: ['Um dos principais objetivos do projeto é internalizar, na equipe de P&D TAESA, o conhecimento científico desenvolvido neste projeto. Portanto, são esperados workshops e treinamentos sobre o tema.'],
      fasesCadeiaInovacao: ['As propostas enviadas à TAESA para este projeto deverão ser compostas pelas seguintes 3 fases da cadeia de inovação de P&D ANEEL, efetivamente dividindo o projeto de P&D em 3 diferentes projetos ANEEL, sequenciais com duração máxima de 24, 12 e 8 meses, respectivamente.'],
      desenvolvimentoExperimental: ['Nesta etapa todos os produtos previstos devem ser concluídos e entregues em pleno funcionamento, bem como entregues para publicação pela TAESA (códigos fonte, documentações, pesos e vieses das redes neurais, softwares compilados, documentação de instalação, etc.).'],
      cabecaSerie: ['Expansão do projeto para que reconheça e funcione com os tipos mais comuns de torres existentes no Sistema Interligado Nacional em diferentes tipos de vegetação e clima. Atualização para novos modelos de drone e smartphone. Nesta etapa todos os produtos previstos devem ser aperfeiçoados para utilização e replicação em escala, ter sua funcionalidade ampliada, ser otimizados, plenamente concluídos e entregues em pleno funcionamento, bem como entregues para publicação pela TAESA (códigos fonte, documentações, pesos e vieses das redes neurais, softwares compilados, documentação de instalação, etc.).'],
      insercaoMercado: ['Divulgação do produto desenvolvido para que seja usado de forma gratuita pelo mercado consumidor por meio de apresentações e treinamentos.'],
      retornoFinanceiroEsperado: ['A TAESA solicita que o Estudo Financeiro do Projeto seja encaminhado evidenciando a viabilidade financeira do projeto com retorno em até 5 anos.'],
      projetosProdutosSimilares: ['Informe os projetos que buscaram solucionar similarmente este mesmo problema. Informe os PRODUTOS existentes, comerciais ou não, que buscam solucionar similarmente este mesmo problema.'],
      buscaAnterioridade: ['A TAESA solicita que o fornecedor apresente uma pesquisa de anterioridade detalhada na proposta considerando anais de eventos do setor elétrico tais como e sem se limitar a: Citenel, SNPTEE e outros; Bancos de publicações de produção científica tais como e sem se limitar a: SCielo, Engineering Village, Scopus, etc; Bancos de patentes e registros tais como e sem se limitar a: INPI e USPTO.'],
      analiseSelecaoPropostas: ['As propostas para execução deste projeto serão analisadas e votadas por um comitê interno da TAESA. A proposta vencedora da seleção passará para a fase de refinamento em conjunto da área demandante do projeto e da Coordenação de P&D TAESA. Os critérios avaliados, que considerarão apenas o conteúdo da proposta, são:'],
      obrigacaoProponenteContrato: ['1)    Por se tratar de desenvolvimento e inserção no mercado, e imperativo a entrega de um produto acabado, pronto para ingressar no mercado.'],
      informacoesGerais: ['Expõe-se como certo que as partes só estarão vinculadas após a assinatura do contrato ou outro instrumento jurídico similar. Dúvidas com relação a esta especificação deverão ser dirigidas ao Setor de Suprimentos da TAESA. '],
    });
  }

  onSubmit() {
    this.valorDoCampo = this.formd.value;
    console.log(this.valorDoCampo);
    localStorage.setItem('dadosPDF', JSON.stringify(this.valorDoCampo));
  }

  add() {
    this.app.alert("Adicionado com sucesso");
  }

  cancelar() {
    const valorEscolhido = this.app.confirm("Todas as alterações feitas serão perdidas. Deseja realmente cancelar ? ", "Cancelar Alterações");
    valorEscolhido.then(response => {
      if (response) {
        // this.rota.navigate(['./padrao-formularios']);
      }
    });
  }

  definirTemas() {
    this.app.prompt("Novo tema", "Informe o novo tema");
  }
}
