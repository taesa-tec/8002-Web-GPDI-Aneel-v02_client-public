import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  @Input() url: string;
  protected realUrlFile: string;
  filename: string;
  loadedFileUrl: SafeResourceUrl;
  isLoading = false;
  errorMessage: string = null;

  constructor(protected http: HttpClient, protected sanitizer: DomSanitizer) {
  }


  async ngOnInit() {
    if (this.url) {
      this.isLoading = true;
      try {
        console.log(this.url);
        const response = await this.http.get(this.url, {observe: 'response', responseType: 'blob'}).toPromise();
        const content = response.headers.get('content-disposition');
        if (content) {
          this.filename = content.split(';')
            .map(i => i.trim())
            .find(i => i.startsWith('filename'))
            .replace(/^filename=/, '');
        }
        this.realUrlFile = URL.createObjectURL(response.body);
        this.loadedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.realUrlFile);
      } catch (e) {
        if (e instanceof HttpErrorResponse && e.status === 404) {
          this.errorMessage = 'Arquivo não encontrado';
        }
      }
      this.isLoading = false;
    }
  }

  download() {
    const a = document.createElement('a');
    a.href = this.realUrlFile;
    a.setAttribute('download', this.filename);
    a.click();
  }

}
