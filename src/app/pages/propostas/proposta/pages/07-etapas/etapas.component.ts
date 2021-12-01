import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TableComponentCols, TableComponentActions, TableComponentFilter} from '@app/core/components/table/table';
import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '@app/services';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';
import {PropostaComponent} from '@app/pages/propostas/proposta/proposta.component';
import {ActivatedRoute, Router} from '@angular/router';
import {EtapaFormComponent} from '@app/pages/propostas/proposta/pages/07-etapas/etapa-form/etapa-form.component';
import {EtapasService} from '@app/pages/propostas/proposta/services/proposta-service-base.service';
import {Proposta} from '@app/commons';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {BehaviorSubject} from 'rxjs';

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
  canEdit: boolean;

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public propostaCanEdit: BehaviorSubject<boolean>,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private app: AppService,
    private service: EtapasService,
    private propostaService: PropostasService,
  ) {
    this.buttons = [];
  }

  async ngOnInit() {
    this.propostaCanEdit.subscribe(can => {

        this.canEdit = can;
        this.buttons = [{
          action: './#${id}',
          isLink: true,
          text: can ? 'Editar' : 'Visualizar',
          icon: can ? 'ta-edit' : 'ta-eye',
          className: 'btn btn-primary'
        }];
      }
    );
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
      console.error(e);
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
