import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntity, ROOT_URL} from '@app/commons';
import {AppService} from '@app/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './modal/modal.component';
import {StorageService} from '@app/services/storage.service';
import {PropostasService} from '@app/proposta/services/propostas.service';
import {PropostaComponent} from '@app/proposta/proposta.component';

@Component({
  templateUrl: './condicoes.component.html',
  styleUrls: ['./condicoes.component.scss']
})
export class CondicoesComponent implements OnInit {

  clausulas: Array<BaseEntity>;
  clausulasAceitas: Map<number, boolean> = new Map<number, boolean>();
  indiceAtual = 0;

  get proposta() {
    return this.parent.proposta;
  }

  get clausulaAceita() {
    return this.clausulasAceitas.has(this.indiceAtual) && this.clausulasAceitas.get(this.indiceAtual);
  }

  constructor(
    @Inject(ROOT_URL) protected root_url: string,
    protected router: Router,
    protected route: ActivatedRoute,
    protected app: AppService, protected modal: NgbModal,
    protected propostasService: PropostasService,
    protected parent: PropostaComponent,
    protected storage: StorageService
  ) {
    const clausulasAceitas = this.storage.get('clausulasAceitas');
    if (clausulasAceitas) {
      try {
        const map = JSON.parse(clausulasAceitas);
        this.clausulasAceitas = new Map<number, boolean>(map);
      } catch (e) {

      }
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.clausulas = (data.clausulas as Array<BaseEntity>).sort((a, b) => Math.sign(a.ordem - b.ordem));
      this.proximaClausulaPendente();
    });

  }

  @HostListener('window:keydown', ['$event'])
  keydown(evt: KeyboardEvent) {
    switch (evt.key) {
      case 'ArrowRight':
        this.proximaClausula();
        break;
      case 'ArrowLeft':
        this.clausulaAnterior();
        break;
    }
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
    this.storage.set('clausulasAceitas', JSON.stringify([...this.clausulasAceitas]));
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
        this.parent.proposta.participacao = proposta.participacao;
        this.router.navigate([this.root_url]).then();
      }
    }
  }

  async finalizar() {
    if (this.clausulas.length === this.clausulasAceitas.size) {
      const proposta = await this.propostasService.aceitarCondicoes(this.proposta.guid);
      this.parent.proposta.dataClausulasAceitas = proposta.dataClausulasAceitas;
      await this.app.alert('Proposta atualizada com sucesso!');
      await this.router.navigate([this.root_url]);
      await this.router.navigate([this.root_url, 'propostas', this.proposta.captacaoId]);
    } else {
      throw new Error('Finalizar foi chamado sem ter todas as clausulas aceitas');
    }


  }


}
