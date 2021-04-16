import {Component, Inject, OnInit, Optional} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntity, Proposta, ROOT_URL} from '@app/commons';
import {AppService} from '@app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './modal/modal.component';
import {PropostasService} from '@app/proposta/services/propostas.service';
import {PropostaComponent} from '@app/proposta/proposta.component';
import {PROPOSTA, PROPOSTA_CAN_EDIT} from '@app/proposta/shared';
import {BehaviorSubject} from 'rxjs';

@Component({
  templateUrl: './condicoes.component.html',
  styleUrls: ['./condicoes.component.scss']
})
export class CondicoesComponent implements OnInit {

  clausulas: Array<BaseEntity>;
  clausulasAceitas: Map<number, boolean> = new Map<number, boolean>();
  indiceAtual = 0;

  proposta: Proposta;

  get clausulaAceita() {
    return this.clausulasAceitas.has(this.indiceAtual) && this.clausulasAceitas.get(this.indiceAtual);
  }

  constructor(
    @Inject(ROOT_URL) protected root_url: string,
    protected router: Router,
    protected route: ActivatedRoute,
    protected app: AppService, protected modal: NgbModal,
    protected propostasService: PropostasService,
    @Inject(PROPOSTA) public propostaObservable: BehaviorSubject<Proposta>,
    @Optional() @Inject(PROPOSTA_CAN_EDIT) public canEdit: boolean
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.clausulas = (data.clausulas as Array<BaseEntity>).sort((a, b) => Math.sign(a.ordem - b.ordem));
    });
    this.propostaObservable.subscribe(proposta => {
      this.proposta = proposta;
    });
  }

  clausulaAnterior() {
    if (this.indiceAtual > 0) {
      this.indiceAtual--;
    } else {
      this.indiceAtual = this.clausulas.length - 1;
    }
  }


  proximaClausulaPendente() {
    if (this.clausulasAceitas.size === this.clausulas.length) {
      return;
    }
    const i = this.clausulas.findIndex((b, idx) => !this.clausulasAceitas.has(idx));
    this.indiceAtual = i >= 0 ? i : this.indiceAtual;
  }

  proximaClausula() {
    this.indiceAtual++;
    this.indiceAtual = this.indiceAtual % this.clausulas.length;
  }

  concordar() {
    this.clausulasAceitas.set(this.indiceAtual, true);
    if (this.clausulasAceitas.size === this.clausulas.length) {
      this.finalizar().then();
    }
    this.proximaClausulaPendente();
  }

  async discordar() {
    const ref = this.modal.open(ModalComponent, {size: 'lg'});
    const result = await ref.result;
    if (result) {
      const clausula = this.clausulas[this.indiceAtual];
      if (clausula) {
        const proposta = await this.propostasService.rejeitarCondicoes(this.proposta.guid, clausula.id);
        this.proposta.participacao = proposta.participacao;
        this.router.navigate([this.root_url]).then();
      }
    }
  }

  async finalizar() {
    if (this.clausulas.length === this.clausulasAceitas.size) {
      const proposta = await this.propostasService.aceitarCondicoes(this.proposta.guid);
      this.proposta.dataClausulasAceitas = proposta.dataClausulasAceitas;
      this.app.alert('Proposta atualizada com sucesso!').then();
      this.propostaObservable.next(this.proposta);
    } else {
      throw new Error('Finalizar foi chamado sem ter todas as clausulas aceitas');
    }


  }


}
