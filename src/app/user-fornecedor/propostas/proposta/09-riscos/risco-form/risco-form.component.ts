import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {Proposta} from '@app/commons';
import {RiscosService} from '@app/user-fornecedor/services/propostas.service';

@Component({
  selector: 'app-risco-form',
  templateUrl: './risco-form.component.html',
  styleUrls: ['./risco-form.component.scss']
})
export class RiscoFormComponent implements OnInit {

  route: ActivatedRoute;
  proposta: Proposta;
  risco: any;

  form = this.fb.group({
    id: 0,
    item: ['', Validators.required],
    classificacao: ['', Validators.required],
    justificativa: ['', Validators.required],
    probabilidade: ['', Validators.required],

  });

  classificacoes = [
    {nome: 'Técnico/Científico'},
    {nome: 'Financeiro'},
    {nome: 'Atraso no Cronograma'}
  ];

  probabilidades = [
    {nome: 'Alto'},
    {nome: 'Médio'},
    {nome: 'Baixo'}
  ];

  constructor(private app: AppService, private fb: FormBuilder, public activeModal: NgbActiveModal, protected service: RiscosService) {
  }

  ngOnInit(): void {
    this.service.captacaoId = this.proposta.captacaoId;
    if (this.route.snapshot.data.risco) {
      this.form.patchValue(this.route.snapshot.data.risco);
    }
  }


  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.service.salvar(this.form.value);
        this.app.alert('Salvo com sucesso!').then();
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar o risco').then();
        console.error(e);
      }
    }
  }


  async remover() {
    if (this.form.value.id !== 0 && await this.app.confirm('Tem certeza que deseja remover?',
      'Confirme a exclusão?')) {
      await this.service.excluir(this.form.value.id);
      this.activeModal.close(true);
    }
  }

}
