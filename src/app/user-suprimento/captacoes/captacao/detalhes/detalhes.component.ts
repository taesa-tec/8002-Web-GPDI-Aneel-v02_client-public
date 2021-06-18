import {Component, OnInit} from '@angular/core';
import {CaptacaoArquivo, CaptacaoDetalhes} from '@app/captacao';
import {CaptacaoComponent} from '@app/user-suprimento/captacoes/captacao/captacao.component';
import {FileService} from '@app/services/file.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styles: []
})
export class DetalhesComponent implements OnInit {

  get captacao(): CaptacaoDetalhes {
    return this.parent?.captacao;
  }

  constructor(public parent: CaptacaoComponent, protected fileService: FileService) {
  }

  ngOnInit(): void {
  }

  async download(arquivo: CaptacaoArquivo) {
    await this.fileService.urlToBlobDownload(arquivo.uri, arquivo.fileName);
  }

}
