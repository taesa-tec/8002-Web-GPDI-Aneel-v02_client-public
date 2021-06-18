import {Component, Input, OnInit} from '@angular/core';
import {Proposta} from '@app/commons';
import {PropostasService} from '@app/propostas/proposta/services/propostas.service';
import {AppService} from '@app/services';
import {FormBuilder, Validators} from '@angular/forms';
import {ContratoService} from '@app/propostas/proposta/services/proposta-service-base.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-aprovador',
  templateUrl: './aprovador.component.html',
  styleUrls: ['./aprovador.component.scss']
})
export class AprovadorComponent implements OnInit {

  @Input() type: 'Contrato' | 'Plano';
  files: File[] = [];
  proposta: Proposta;
  arquivos: Array<any> = [];
  alteracaoRequerida = false;
  form = this.fb.group({
    mensagem: ['', Validators.required]
  });

  constructor(protected service: PropostasService,
              protected router: Router,
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

  fileChange(evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    // this.files = [];
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  removeFile(i) {
    this.files.splice(i, 1);
  }

  async cancelarProcesso() {

    if (await this.app.confirm('Esta ação é irreversível. Ao cancelar o processo de refinamento o fornecedor será notificado por e-mail',
      'TEM CERTEZA QUE DESEJA CANCELAR O PROCESSO DE REFINAMENTO?', [
        {text: 'Cancelar', value: false, cssClass: 'btn btn-link'},
        {
          text: 'Ok',
          value: true,
          cssClass: 'btn-primary',
          checked: false,
          checkMessage: 'Confirmo o cancelamento do processo de refinamento'
        }
      ])) {
      await this.service.post(`${this.proposta.guid}/CancelarRefinamento`, {});
      await this.app.alert('Processo de refinamento cancelado');
      await this.router.navigate(['/']);

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
        await this.service.aprovarPlano(this.proposta.guid);
        this.proposta.planoTrabalhoAprovacao = 'Aprovado';
        this.service.setProposta(this.proposta);
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
      let solicitacao: any;
      switch (this.type) {
        case 'Contrato':
          solicitacao = await this.contratoService.solicitarAlteracao(this.form.value.mensagem);
          await this.uploadFiles(solicitacao.id);
          this.proposta.contratoAprovacao = 'Alteracao';
          this.service.setProposta(this.proposta);
          break;
        case 'Plano':
          solicitacao = await this.service.solicitarAlteracao(this.proposta.guid, this.form.value.mensagem);
          await this.uploadFiles(solicitacao.id);
          this.proposta.planoTrabalhoAprovacao = 'Alteracao';
          this.service.setProposta(this.proposta);
          break;

      }
    } catch (e) {
      console.error(e);
    }
    this.app.hideLoading();

  }

  async uploadFiles(id) {
    if (this.files.length === 0 || parseFloat(id) === 0) {
      return;
    }
    switch (this.type) {
      case 'Contrato':
        await this.contratoService.upload(this.files, `Comentario/${id}/Arquivo`);
        break;
      case 'Plano':
        await this.service.upload(this.files, `Comentario/${id}/Arquivo`);
        break;
    }
  }
}
