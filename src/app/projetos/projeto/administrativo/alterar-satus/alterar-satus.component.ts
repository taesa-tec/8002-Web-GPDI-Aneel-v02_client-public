import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProjetoService} from '@app/projetos/projeto/services/projeto.service';
import {AppService} from '@app/services';
import {Projeto} from '@app/projetos/projeto/projeto.component';

@Component({
  selector: 'app-alterar-satus',
  templateUrl: './alterar-satus.component.html',
  styles: []
})
export class AlterarSatusComponent implements OnInit {

  status = this.fb.control('', Validators.required);
  form = this.fb.group({
    status: this.status
  });
  projeto: Projeto;

  constructor(protected fb: FormBuilder, protected service: ProjetoService, protected app: AppService) {
  }

  ngOnInit(): void {
    this.service.projeto.subscribe(p => {
      this.projeto = p;
      this.form.reset(p);
      this.form.updateValueAndValidity();
    });
  }

  async submit() {
    if (this.form.invalid) {
      return;
    }
    this.app.loading.show().then();
    try {


      await this.service.put(`${this.projeto.id}/Status`, this.form.value);
      this.projeto.status = this.form.value.status;
      this.service.setProjeto(this.projeto);
      this.app.alert('Status atualizado com sucesso!').then();
    } catch (e) {
      this.app.alertError('Não foi possível atualizar o status do projeto, tente novamente mais tarde').then();
    }
    this.app.loading.hide();


  }
}
