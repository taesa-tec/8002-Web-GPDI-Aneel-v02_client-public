import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Projeto } from '@app/pages/projetos/projeto/projeto.component';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { ProducaoCientifica } from '../../relatorio';
import { AppService } from '@app/services';
import { FileService } from '@app/services/file.service';
import * as moment from 'moment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  projeto: Projeto;
  producao: ProducaoCientifica;
  paises: Array<{ id: number; nome: string }>;
  file: File;

  form = this.fb.group({
    id: [0, Validators.required],
    tipo: ['', Validators.required],
    dataPublicacao: ['', Validators.required],
    confirmacaoPublicacao: ['', Validators.required],
    nomeEventoPublicacao: ['', Validators.required],
    linkPublicacao: ['', Validators.required],
    paisId: ['', Validators.required],
    cidade: ['', Validators.required],
    tituloTrabalho: ['', Validators.required]
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
    if(this.producao) {
      this.form.patchValue({
        ...this.producao,
        dataPublicacao: moment(this.producao.dataPublicacao).format("yyyy-MM-D")
      });
    }
  }

  fileChange(file: string, evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    this[file] = files.length > 0 ? files.item(0) : null;
  }

  deleteFile() {
    this.producao.arquivoTrabalhoOrigemId = null;
  }

  async downloadFile() {
    await this.fileService.urlToBlobDownload(`Projetos/${this.projeto.id}/Relatorio/ProducaoCientifica/${this.producao.id}/Arquivos/Origem`, null);
  }

  validate() {
    return (this.form.valid && (this.producao?.arquivoTrabalhoOrigemId || this.file));
  }

  async delete() {
    try {
      if(this.form.valid) {
        if(await this.app.confirm("Tem certeza que deseja excluir esta produção científica?")) {
          await this.service.delete(`${this.projeto.id}/Relatorio/ProducaoCientifica/${this.form.value.id}`);
          this.activeModal.close();
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async submit() {
    try {
      if(this.validate()) {
        let producao = this.form.value;
        let path = `${this.projeto.id}/Relatorio/ProducaoCientifica`;

        if(producao.id) {
          producao = await this.service.put(path, producao);
        } else {
          producao = await this.service.post(path, producao);
        }

        if(this.file) {
          await this.service.upload([this.file], `${path}/${producao.id}/Arquivos/Origem`);
        }

        this.activeModal.close();
      }
    } catch(e) {
      console.log(e.message);
    }
  }

}
