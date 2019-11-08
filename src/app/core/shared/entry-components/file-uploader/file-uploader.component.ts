import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  files: FileList;

  isSending = false;
  progress: number;
  form: FormGroup;

  protected _filesSent: Array<any>;

  get filesSent() {
    return this._filesSent;
  }

  set filesSent(value) {
    this._filesSent = value;
    this.form = new FormGroup({});
    this._filesSent.forEach(file => {
      this.form.addControl(file.id, this.fb.control(false));
    });
  }


  constructor(public activeModal: NgbActiveModal, protected http: HttpClient, protected  fb: FormBuilder) {

  }

  async ngOnInit() {
    this.filesSent = await this.getFiles();
  }

  async getFiles() {
    return await this.http.get<Array<any>>('File').toPromise();
  }

  fileChange(event) {
    this.sendFiles();
  }

  async sendFiles() {
    try {
      this.isSending = true;
      const formdata = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files.item(i);
        formdata.append(`files[${i}]`, file);
      }
      // const request = new HttpRequest('POST', 'File', formdata, {reportProgress: true});

      this.http.post('File', formdata, {reportProgress: true, observe: 'events'})
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
                this.filesSent = [...this.filesSent, ...event.body].map((f, i) => {
                  f.id = i;
                  return f;
                });
              }
          }
        }, error => {
          console.log(error);
          this.progress = 0;
          this.isSending = false;
        });

    } catch (e) {
      console.log(e);
    }
  }

  selectFiles() {
    const selectedFiles = this.filesSent.filter(f => this.form.value[f.id]);
    this.activeModal.close(selectedFiles);
  }
}
