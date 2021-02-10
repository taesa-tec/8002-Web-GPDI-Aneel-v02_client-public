import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Demanda} from '@app/commons/demandas';
import {AppService} from '@app/services/app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '@app/services/users.service';

@Component({
  selector: 'app-avaliar-demanda',
  templateUrl: './avaliar-demanda.component.html',
  styleUrls: []
})
export class AvaliarDemandaComponent implements OnInit {

  @Input() demanda: Demanda;
  @Input('responsavel') responsavelId: string;
  @Output() avaliacao = new EventEmitter<Demanda>();
  form: FormGroup = null;
  canUpdate = false;

  constructor(protected  app: AppService,
              protected usersService: UsersService,
              protected fb: FormBuilder) {

  }

  ngOnInit() {
    if (this.demanda === undefined) {
      throw new Error('Demanda não passada para o componete');
    }
  }

  async proximaEtapa() {
    if (!await this.app.confirm('Confirme a aprovação para a próxima etapa')) {
      return;
    }
    this.app.showLoading();
    try {
      const demanda = await this.app.demandas.proximaEtapa(this.demanda.id, {comentario: ''});
      this.avaliacao.emit(demanda);
    } catch (e) {
      console.error(e);
    }
    this.app.hideLoading();
  }

  protected mountForm() {
    this.form = this.fb.group({
      motivo: this.fb.control('', [Validators.required]),
      proximaEtapa: 'reiniciar'
    });
  }

  async reprovar() {
    if (this.form == null) {
      this.mountForm();
      return;
    }
    if (this.form.valid) {
      this.app.showLoading();
      try {
        let result;
        if (this.form.value.proximaEtapa === 'reiniciar') {
          result = await this.app.demandas.reprovarDemanda(this.demanda.id, this.form.value.motivo);
        } else {
          result = await this.app.demandas.reprovarPermanente(this.demanda.id, this.form.value.motivo);
        }
        this.avaliacao.emit(result);
        this.app.alert('Salvo com sucesso!');
        console.log(result);
      } catch (e) {
        if (e.error && e.error.Message) {
          this.app.alert(e.error.Message, 'Erro!');
        }
      }
      this.app.hideLoading();
    }
  }


  cancelarReprovacao() {
    this.form = null;
  }

}
