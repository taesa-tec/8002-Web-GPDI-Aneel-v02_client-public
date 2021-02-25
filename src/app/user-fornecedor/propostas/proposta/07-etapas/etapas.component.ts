import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TableComponentCols, TableComponentActions, TableComponentFilter} from '@app/core/components/table/table';
import {Component, OnInit} from '@angular/core';
import {AppService} from '@app/services';
import {EtapasService, PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ProdutoFormComponent} from '@app/user-fornecedor/propostas/proposta/06-produtos/produto-form/produto-form.component';
import {EtapaFormComponent} from '@app/user-fornecedor/propostas/proposta/07-etapas/etapa-form/etapa-form.component';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.scss']
})
export class EtapasComponent implements OnInit {

  loading = false;
  duracao = 1;

  cols: TableComponentCols = [
    {
      field: 'ordem',
      title: 'Etapas',
      order: true,
      value: i => `Etapa ${i.ordem.toString().padStart(2, '0')}`
    },
    {
      field: 'meses',
      title: 'Meses da Etapa',
      value: i => i.meses.map(m => m.toString().padStart(2, '0')).join(', ')
    },
    {
      field: 'produto',
      title: 'Produto',
      order: true,
    }
  ];

  buttons: TableComponentActions = [
    {
      action: './#${id}',
      isLink: true,
      text: 'Editar',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
  ];
  etapas = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private app: AppService,
    private service: EtapasService,
    private propostaService: PropostasService,
    private proposta: PropostaComponent) {
  }

  async ngOnInit() {
    this.duracao = this.proposta.proposta.duracao;
    this.route.data.subscribe(data => {
      this.etapas = data.etapas;
    });
    this.route.fragment.subscribe(f => {
      if (f === 'novo' || !isNaN(parseFloat(f))) {
        this.formEtapa();
      }
    });
  }

  async tableAction({action, data}) {
    if (action === 'editar') {
    }
  }

  async formEtapa(etapa?: any) {
    const ref = this.modal.open(EtapaFormComponent, {size: 'lg'});
    const cmp = ref.componentInstance as EtapaFormComponent;
    cmp.proposta = this.proposta.proposta;
    cmp.route = this.route;
    try {
      await ref.result;
    } catch (e) {

    }
    this.router.navigate([]).then();
  }

  async salvarDuracao() {
    this.loading = true;
    try {
      await this.propostaService.atualizarDuracao(this.proposta.proposta.captacaoId, this.duracao);
      this.proposta.proposta.duracao = this.duracao;
    } catch (e) {
      this.duracao = this.proposta.proposta.duracao;
      if (e.error && e.error.title && e.error.detail) {
        this.app.alert(e.error.detail, e.error.title).then();
      } else {
        console.error(e);
      }
    }
    this.loading = false;

  }
}
