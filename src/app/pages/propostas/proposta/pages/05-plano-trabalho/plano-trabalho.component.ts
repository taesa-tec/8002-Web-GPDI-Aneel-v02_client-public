import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {PropostasService} from '@app/pages/propostas/proposta/services/propostas.service';
import {PropostaComponent} from '@app/pages/propostas/proposta/proposta.component';
import {Proposta} from '@app/commons';
import {PROPOSTA_CAN_EDIT} from '@app/pages/propostas/proposta/shared';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-plano-trabalho',
  templateUrl: './plano-trabalho.component.html',
  styleUrls: ['./plano-trabalho.component.scss']
})
export class PlanoTrabalhoComponent implements OnInit {
  proposta: Proposta;
  form = this.fb.group({
    motivacao: ['', [Validators.required]],
    originalidade: ['', [Validators.required]],
    aplicabilidade: ['', [Validators.required]],
    relevancia: ['', [Validators.required]],
    buscaAnterioridade: ['', [Validators.required]],
    razoabilidadeCustos: ['', [Validators.required]],
    metodologiaTrabalho: ['', [Validators.required]],
    bibliografia: ['', [Validators.required]],
    pesquisasCorrelatasPeDAneel: ['', [Validators.required]],
    pesquisasCorrelatasPeD: ['', [Validators.required]],
    pesquisasCorrelatasExecutora: ['', [Validators.required]],

  });
  files: Array<any> = [];
  canEdit: boolean;

  constructor(
    @Inject(PROPOSTA_CAN_EDIT) public propostaCanEdit: BehaviorSubject<boolean>,
    private app: AppService, private fb: FormBuilder, private route: ActivatedRoute,
    private parent: PropostaComponent,
    private service: PropostasService
  ) {
  }

  ngOnInit(): void {
    this.propostaCanEdit.subscribe(can => this.canEdit = can);
    this.route.data.subscribe(data => {
      if (data.plano && typeof data.plano === 'object') {
        const {arquivos, ...values} = data.plano;
        this.form.patchValue(values);
        this.updateFormFiles(arquivos);
      }
    });
    if (!this.canEdit) {
      this.form.disable();
    }
    this.service.proposta.subscribe(proposta => this.proposta = proposta);
  }

  updateFormFiles(files) {
    this.files = files;
  }

  async anexarArquivos() {
    try {
      const files = await this.app.uploadForm(this.files.map(f => f.id),
        `Propostas/${this.proposta.guid}/Arquivos`);
      this.updateFormFiles(files);
    } catch (e) {

    }
  }

  async download(file) {
    await this.service.downloadArquivo(this.proposta.guid, file);
  }

  async onSubmit() {
    if (this.form.valid) {

      try {
        await this.service.savePlanoTrabalho(this.proposta.guid, this.form.value);
        this.app.alert('Plano de trabalho salvo com sucesso').then();
      } catch (e) {
        this.app.alert('Não foi possível salvar o plano de trabalho').then();
        console.error(e);
      }
    }
  }
}
