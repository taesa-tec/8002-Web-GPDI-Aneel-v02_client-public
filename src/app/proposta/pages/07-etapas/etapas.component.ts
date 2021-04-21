import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TableComponentCols, TableComponentActions, TableComponentFilter} from '@app/core/components/table/table';
import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '@app/services';
import {PropostasService} from '@app/proposta/services/propostas.service';
import {PropostaComponent} from '@app/proposta/proposta.component';
import {ActivatedRoute, Router} from '@angular/router';
import {EtapaFormComponent} from '@app/proposta/pages/07-etapas/etapa-form/etapa-form.component';
import {EtapasService} from '@app/proposta/services/proposta-service-base.service';
import {Proposta} from '@app/commons';
import {PROPOSTA_CAN_EDIT} from '@app/proposta/shared';

@Component({
  selector: 'app-etapas',
  templateUrl: './etapas.component.html',
  styleUrls: ['./etapas.component.scss']
})
export class EtapasComponent implements OnInit {

  proposta: Proposta;
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

  buttons: TableComponentActions;
  etapas = [];

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public canEdit: boolean,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private app: AppService,
    private service: EtapasService,
    private propostaService: PropostasService,
  ) {
    this.buttons = [
      {
        action: './#${id}',
        isLink: true,
        text: canEdit ? 'Editar' : 'Visualizar',
        icon: canEdit ? 'ta-edit' : 'ta-eye',
        className: 'btn btn-primary'
      }
    ];
  }

  async ngOnInit() {
    this.route.data.subscribe(data => {
      this.etapas = data.etapas;
    });
    this.route.fragment.subscribe(f => {
      if (f === 'novo' || !isNaN(parseFloat(f))) {
        this.formEtapa();
      }
    });
    this.propostaService.proposta.subscribe(p => {
      this.proposta = p;
      this.duracao = this.proposta.duracao;
    });

  }

  async tableAction({action, data}) {
    if (action === 'editar') {
    }
  }

  async formEtapa(etapa?: any) {
    const ref = this.modal.open(EtapaFormComponent, {size: 'lg'});
    const cmp = ref.componentInstance as EtapaFormComponent;
    cmp.proposta = this.proposta;
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
      await this.propostaService.atualizarDuracao(this.proposta.guid, this.duracao);
      this.proposta.duracao = this.duracao;
    } catch (e) {
      this.duracao = this.proposta.duracao;
      if (e.error && e.error.title && e.error.detail) {
        this.app.alert(e.error.detail, e.error.title).then();
      } else {
        console.error(e);
      }
    }
    this.loading = false;

  }
}
