import {Component, Input, OnInit} from '@angular/core';
import {Proposta} from '@app/commons';
import {PropostasService} from '@app/proposta/services/propostas.service';
import {AppService} from '@app/services';
import {FormBuilder, Validators} from '@angular/forms';
import {ContratoService} from '@app/proposta/services/proposta-service-base.service';

@Component({
  selector: 'app-aprovador',
  templateUrl: './aprovador.component.html',
  styleUrls: ['./aprovador.component.scss']
})
export class AprovadorComponent implements OnInit {

  @Input() type: 'Contrato' | 'Plano';
  proposta: Proposta;
  arquivos: Array<any> = [];
  alteracaoRequerida = false;
  form = this.fb.group({
    mensagem: ['', Validators.required]
  });

  constructor(protected service: PropostasService,
              protected contratoService: ContratoService, protected app: AppService, protected fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.service.proposta.subscribe(p => this.proposta = p);
  }

  async anexarArquivos() {
    try {

      this.arquivos = await this.app.uploadForm([]);
      console.log(this.arquivos);
    } catch (e) {
      //
    }
  }

  async cancelarProcesso() {

    if (await this.app.confirm('Esta ação é irreversível. Ao cancelar o processo de refinamento o fornecedor será notificado por e-mail',
      'TEM CERTEZA QUE DESEJA CANCELAR O PREOCESSO DE REFINAMENTO?', [
        {text: 'Cancelar', value: false, cssClass: 'btn btn-link'},
        {
          text: 'Ok',
          value: true,
          cssClass: 'btn-primary',
          checked: false,
          checkMessage: 'Confirmo o cancelamento do processo de refinamento'
        }
      ])) {
      // @TODO Chamada a api para cancelamento
    }
  }


  async aprovar() {
    this.app.showLoading();
    switch (this.type) {
      case 'Contrato':
        await this.contratoService.aprovar();
        this.proposta.contratoAprovacao = 'Aprovado';
        this.service.setProposta(this.proposta);
        break;
      case 'Plano':
        break;

    }
    this.app.hideLoading();
  }

  cancelarSolicitacao() {
    this.alteracaoRequerida = false;
  }

  solicitarAlteracao() {
    this.alteracaoRequerida = true;
  }

  async enviarSolicitacaoAlteracao() {
    if (this.form.invalid) {
      return;
    }
    this.app.showLoading();
    try {

      switch (this.type) {
        case 'Contrato':
          await this.contratoService.solicitarAlteracao(this.form.value.mensagem);
          this.proposta.contratoAprovacao = 'Alteracao';
          this.service.setProposta(this.proposta);
          break;
        case 'Plano':
          await this.service.solicitarAlteracao(this.proposta.guid, this.form.value.mensagem);
          this.proposta.planoTrabalhoAprovacao = 'Alteracao';
          this.service.setProposta(this.proposta);
          break;

      }
    } catch (e) {
      console.error(e);
    }
    this.app.hideLoading();

  }
}
