import { AppService } from './../../../../core/services/app.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadFilesService } from '../services/upload-files.service';

@Component({
  selector: 'app-documento-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./documento-pdf.component.scss']
})
export class DocumentoPdfComponent implements OnInit {

  dadosPDF: any;
  nameArquivo: any;
  fileNames = [];
  files: Set<File>;
  constructor(private app: AppService, private up: UploadFilesService) { }

  // @ViewChild('content') content: ElementRef;

  ngOnInit() {
    this.dadosPDF = localStorage.getItem('dadosPDF');
  }

  download() {

    this.up.download(`Projeto/36/ExtratoEmpresas/exportar`).subscribe((res: any) => {
      const file = new Blob([res], {
        type: res.type
      });

      const blob = window .URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = blob;
      link.download = 'report.pdf';
      link.click();
      window.URL.revokeObjectURL(blob);
      link.remove();
    });
    
  }

  anexar(event) {
    const selectFiles = <FileList>event.srcElement.files;
    this.nameArquivo = selectFiles[0].name;
    this.files = new Set();
    for (let i = 0; i < selectFiles.length; i++) {
      this.fileNames.push(selectFiles[i].name);
      this.files.add(selectFiles[i]);
      this.onUpload();
      console.log(this.files);
    }
    this.nameArquivo = this.fileNames.join(', ');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      // this.up.upload(this.files, 'http://localhost:8000/upload').subscribe(response => console.log('Upload Concluído'));
      // if (this.files !== 'application/pdf') {
      //   this.app.alert('Arquivo com formato inválido');
      // } else {
      //   localStorage.setItem('nameArquivo', this.nameArquivo);
      // }
      localStorage.setItem('nameArquivo', this.nameArquivo);
    }
  }
}
