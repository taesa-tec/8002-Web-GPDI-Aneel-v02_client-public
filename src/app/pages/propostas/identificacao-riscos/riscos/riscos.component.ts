import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService, ServiceBase} from '@app/services';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {EquipePeD} from '@app/commons';
import {FormBuilder, Validators} from '@angular/forms';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-selecao',
  templateUrl: './riscos.component.html',
  styles: []
})
export class RiscosComponent implements OnInit, OnDestroy {

  protected subscription: Subscription;
  minDateAlvo = (new Date()).toJSON().replace(/T.+$/, '');
  route: ActivatedRoute;
  propostas: Array<any> = [];
  equipe: EquipePeD;
  file: File;
  captacaoId = 0;

  propostaCtrl = this.fb.control('', [Validators.required]);
  form = this.fb.group({
    responsavelId: ['', Validators.required],
  });

  constructor(public activeModal: NgbActiveModal,
              protected app: AppService,
              protected fb: FormBuilder,
              protected service: ServiceBase<any>,
              protected fileService: FileService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.propostas = data.propostas;
      this.equipe = data.equipe;
      this.captacaoId = parseFloat(this.route.snapshot.fragment);
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  selecionar(id) {
    this.propostaCtrl.setValue(id);
    this.form.updateValueAndValidity();
  }

  async download(proposta, arquivo: string) {
    console.log(proposta);
    await this.fileService.urlToBlobDownload(`Captacoes/${proposta.captacaoId}/Propostas/${proposta.id}/${arquivo}`, `${arquivo}(${proposta.fornecedor}).pdf`);
  }

  async anexarArquivos(evt) {
    try {
      this.file = evt.target.files.item(0);
    } catch (e) {
      console.log(e);
    }
  }

  async submit() {
    if (this.form.invalid) {
      return;
    }
    this.app.loading.show().then();
    try {
      await this.service.post(`${this.captacaoId}/ConfirmarRiscos`, this.form.value);
      try {
        await this.service.upload([this.file], `${this.captacaoId}/ConfirmarRiscos/Arquivo`);
      } catch (e) {
        this.app.alertError('Não foi possível enviar o arquivo comprobatório').then();
      }
      this.app.alert('Identificação de Riscos salva com sucesso!').then();
      this.activeModal.close();
    } catch (e) {
      console.error(e);
      if (e.error?.detail) {
        this.app.alertError(e.error.detail).then();
      } else {
        this.app.alertError('Não foi possível salvar a Identificação de Riscos').then();
      }
    }
    this.app.loading.hide();


  }

}
