import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '@app/services/app.service';
import _configEditor from '@app/core/config-editor';
import {PropostasService} from '@app/user-fornecedor/services/propostas.service';
import {PropostaComponent} from '@app/user-fornecedor/propostas/proposta/proposta.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HistoricoComponent} from '@app/user-fornecedor/propostas/proposta/04-validacao-contratos/historico/historico.component';

interface Parent {
  titulo: string;
  header: string;
  conteudo: string;
  footer: string;
  id: number;
}

interface Contrato {
  parentId: number;
  parent: Parent;
  titulo: string;
  conteudo: null;
  revisoes: any[];
  finalizado: boolean;
  propostaId: number;
  id: number;
}


@Component({
  selector: 'app-view-contrato',
  templateUrl: './view-contrato.component.html',
  styleUrls: ['./view-contrato.component.scss']
})
export class ViewContratoComponent implements OnInit {
  configEditor = _configEditor;
  contrato: Contrato;
  form = this.fb.group({
    draft: [true],
    conteudo: ['', Validators.required]
  });

  constructor(
    private app: AppService,
    private parent: PropostaComponent,
    private service: PropostasService,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.contrato = data.contrato;
      this.form.get('conteudo').patchValue(this.contrato.conteudo || this.contrato.parent.conteudo);
    });
  }

  async onSubmit(evt: any) {
    try {
      this.app.loading.show().then();
      const saveAsDraft = evt.submitter.value === 'draft';
      this.form.get('draft').setValue(saveAsDraft);
      if (this.form.valid) {
        await this.service.saveContrato(this.parent.proposta.captacaoId, this.contrato.parentId, this.form.value);
        this.app.alert('Contrato Salvo com sucesso!').then();
      }
    } catch (e) {

    } finally {
      this.app.loading.hide();
    }
  }

  async historico() {
    const ref = this.modal.open(HistoricoComponent, {size: 'xl'});
    const component = ref.componentInstance as HistoricoComponent;
    await ref.result;
  }

}
