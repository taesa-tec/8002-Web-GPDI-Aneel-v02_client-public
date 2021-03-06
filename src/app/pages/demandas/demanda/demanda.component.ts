import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Demanda} from '@app/commons/demandas';
import {DemandaMenuProvider, DemandaProvider} from '@app/pages/demandas/demanda/providers';
import {EQUIPE_PED} from '@app/commons';

@Component({
  selector: 'app-demanda',
  templateUrl: './demanda.component.html',
  styleUrls: ['demanda.component.scss'],
  providers: [{
    provide: EQUIPE_PED,
    deps: [ActivatedRoute],
    useFactory: (route: ActivatedRoute) => {
      return route.snapshot.data.equipe;
    }
  },
    DemandaProvider,
    DemandaMenuProvider,
  ]
})
export class DemandaComponent implements OnInit {

  DemandaId: string;
  DemandaTitulo: string;
  DemandaEtapa: string;

  protected $demanda: Demanda;

  get demanda() {
    return this.$demanda;
  }

  set demanda(value) {
    this.$demanda = value;
    if (!this.$demanda == null || this.$demanda === undefined) {
      return;
    }
    if (this.$demanda.id) {
      const id = String(this.$demanda.id).padStart(3, '0');
      this.DemandaId = `ID-${id}`;
    }
    this.DemandaTitulo = this.$demanda.titulo || '';
    this.DemandaEtapa = this.ETAPAS[this.$demanda.etapaAtual] || '';
  }


  readonly ETAPAS = {
    0: 'Elaboração',
    1: 'Pre-Aprovação',
    2: 'Revisor Pendente',
    3: 'Aprovação Revisor',
    4: 'Aprovação Coordenador',
    5: 'Aprovação Gerente',
    6: 'Aprovação Diretor',
    7: 'Captação'
  };

  constructor(protected modal: NgbModal, protected route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.demanda = data.demanda;
    });
  }

}
