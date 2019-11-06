import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  @Input() url: string;
  loadedFileUrl: SafeResourceUrl;

  constructor(protected http: HttpClient, protected sanitizer: DomSanitizer) {
  }

  async ngOnInit() {
    if (this.url) {
      try {

        const file = await this.http.get(this.url, {
          responseType: 'blob'
        }).toPromise();
        this.loadedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
        console.log(file);
      } catch (e) {
        console.log(e.message);
      }
    }
  }

}
