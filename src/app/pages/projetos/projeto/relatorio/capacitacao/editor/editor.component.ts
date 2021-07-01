import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Projeto } from '@app/pages/projetos/projeto/projeto.component';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { FileService } from '@app/services/file.service';
import { Capacitacao } from '../../relatorio';
import { AppService } from '@app/services';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  projeto: Projeto;
  capacitacao: Capacitacao;
  file: File;

  form = this.fb.group({
    id: [0, Validators.required],
    recursoId: ['', Validators.required],
    tipo: ['', Validators.required],
    isConcluido: ['', Validators.required],
    dataConclusao: ['', Validators.required],
    cnpjInstituicao: ['', Validators.required],
    areaPesquisa: ['', Validators.required],
    tituloTrabalhoOrigem: ['', Validators.required]
  });

  constructor(
    private app: AppService,
    private fileService: FileService,
    private service: ProjetoService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.projeto = this.service.getCurrentProjeto();

    if(this.capacitacao) {
      this.form.patchValue(this.capacitacao);
    }
  }

  fileChange(file: string, evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    this[file] = files.length > 0 ? files.item(0) : null;
  }

  async delete() {
    try {
      if(this.form.valid) {
        if(await this.app.confirm("Tem certeza que deseja excluir esta capacitacao?")) {
          await this.service.delete(`${this.projeto.id}/Relatorio/Capacitacao/${this.form.value.id}`);
          this.activeModal.close();
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async submit() {
    try {
      if(this.form.valid) {
        let capacitacao = this.form.value;
        let path = `${this.projeto.id}/Relatorio/Capacitacao`;

        if(capacitacao.id) {
          await this.service.put(path, capacitacao);
        } else {
          capacitacao = await this.service.post(path, capacitacao);

          await this.service.upload([this.file], `${path}/${capacitacao.id}/Arquivos/Origem`);
          //await this.fileService.urlToBlobDownload(`Projetos/${path}/1/Arquivos/Origem`, '');
          //console.log("AQUI");
        }
        //this.activeModal.close();
      }
    } catch(e) {
      console.log(e.message);
    }
  }

}
