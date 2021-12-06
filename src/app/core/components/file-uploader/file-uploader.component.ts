import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {AppService} from '@app/services/app.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  protected _preSelecteds: Array<number> = [];
  protected _app: AppService;

  files: FileList;
  isSending = false;
  isMulti = true;
  progress: number;
  pathUpload = 'File';
  selecteds = {};


  get app() {
    return this._app;
  }

  set app(value: AppService) {
    this._app = this._app || value;
  }


  @Input() set preSelected(value: Array<number>) {
    this._preSelecteds = value;

  }

  protected _filesSent: Array<any>;

  get filesSent() {
    return this._filesSent;
  }

  set filesSent(value) {
    this._filesSent = value;
    this._filesSent.forEach(file => {
      this.selecteds[file.id] = this._preSelecteds.indexOf(file.id) > -1;
    });
  }


  constructor(public activeModal: NgbActiveModal, protected http: HttpClient, protected fb: FormBuilder) {

  }

  async ngOnInit() {
    this.filesSent = await this.getFiles();
  }

  async getFiles() {
    return await this.http.get<Array<any>>(this.pathUpload).toPromise();
  }

  fileChange(event) {
    this.sendFiles();
  }

  fileChangeError(message) {
    this._app.alertError(message);
  }


  async sendFiles() {
    try {
      this.isSending = true;
      const formdata = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files.item(i);
        formdata.append(`files[${i}]`, file);
      }
      this._preSelecteds = this.filesSent.filter(f => this.selecteds[`${f.id}`]).map(f => f.id);
      this.http.post(this.pathUpload, formdata, {reportProgress: true, observe: 'events'})
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.progress = 0;
              this.isSending = true;
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(100 * event.loaded / event.total);
              break;
            case HttpEventType.Response:
              this.progress = 100;
              this.isSending = false;
              if (event.status === 200) {
                this._preSelecteds = [...this._preSelecteds, ...event.body.map(f => f.id)];
                this.filesSent = [...this.filesSent, ...event.body];
              }
          }
        }, error => {
          console.error(error);
          this.app.alertError('Erro no upload, verifique os arquivos permitidos e tente novamente');
          this.progress = 0;
          this.isSending = false;
        });

    } catch (e) {

    }
  }

  selectFiles() {
    const selectedFiles = this.filesSent.filter(f => this.selecteds[f.id]);
    this.activeModal.close(selectedFiles);
  }

  async deleteFile(event: MouseEvent, file) {
    event.preventDefault();
    if (await this.app.confirm('Tem certeza que deseja excluir esse arquivo? Essa ação não pode ser desfeita', 'Tem certeza?')) {
      await this.http.delete(`${this.pathUpload}/${file.id}`).toPromise();
      this.filesSent.splice(this.filesSent.indexOf(file), 1);

      this.app.alert('Arquivo excluido');
    }
  }
}
