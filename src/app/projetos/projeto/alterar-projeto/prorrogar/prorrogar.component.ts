import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Projeto} from '@app/projetos/projeto/projeto.component';
import {ProjetoService} from '@app/projetos/projeto/services/projeto.service';
import {AppValidators} from '@app/commons';
import {AppService} from '@app/services';

@Component({
  selector: 'app-prorrogar',
  templateUrl: './prorrogar.component.html',
  styles: []
})
export class ProrrogarComponent implements OnInit {

  projeto: Projeto;
  produtos: Array<any>;
  form = this.fb.group({
    data: ['', [Validators.required]],
    descricao: ['', Validators.required],
    produtos: [[''], (c: AbstractControl) => {
      if (c.value.some(v => v === '')) {
        return {required: true};
      }
      return null;
    }]
  });

  constructor(protected route: ActivatedRoute, protected fb: FormBuilder, protected service: ProjetoService, protected app: AppService) {
  }

  ngOnInit(): void {
    this.projeto = this.service.getCurrentProjeto();
    const dataCtrl = this.form.get('data');
    dataCtrl.setValidators([Validators.required, AppValidators.minDate(this.projeto.dataFinalProjeto)]);
    this.route.data.subscribe(data => {
      this.produtos = data.produtos.filter(p => p.classificacao === 'Intermediario');
    });
  }

  async submit() {
    if (this.form.invalid) {
      return;
    }
    try {
      await this.service.prorrogar(this.projeto.id, this.form.value);
      this.app.alert('Projeto Prorrogado com sucesso').then();
    } catch (e) {
      console.error(e);
    }

  }

}
