import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';

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

  constructor(protected http: HttpClient, protected sanitizer: DomSanitizer) {
  }


  async ngOnInit() {
    if (this.url) {
      try {

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
        console.error(e.message);
      }
    }
  }

  download() {
    const a = document.createElement('a');
    a.href = this.realUrlFile;
    a.setAttribute('download', this.filename);
    a.click();
  }

}
