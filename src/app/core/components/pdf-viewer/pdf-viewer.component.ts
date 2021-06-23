import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {FileService} from '@app/services/file.service';
import {environment} from '@env/environment';

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
  pdfProgress: any = 0;

  constructor(protected http: HttpClient, protected sanitizer: DomSanitizer, protected file: FileService) {
  }


  ngOnInit() {
    if (this.url) {
      this.loadUrlFile(this.url).then();
    }
  }

  async loadUrlFile(url) {
    try {
      this.isLoading = true;
      this.realUrlFile = await this.file.download(url, p => {
        this.pdfProgress = (p.loaded / p.total) * 100;
      });
      this.loadedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.realUrlFile);
    } catch (e) {
      console.log(e);
      if (e instanceof HttpErrorResponse && e.status === 404) {
        this.errorMessage = 'Arquivo não encontrado';
      }
    } finally {
      this.pdfProgress = null;
      this.isLoading = false;
    }
  }

  download() {
    this.file.urlToBlobDownload(this.url, '').then();
  }

}
