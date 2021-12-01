import {Component, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPageComponent {

  htmlContent: SafeHtml;
  loading = false;

  protected _title = 'Detalhamento';
  get title() {
    return this._title;
  }

  set title(title: string) {
    this._title = title.length > 0 ? title : 'Detalhamento';
  }

  constructor(public activeModal: NgbActiveModal, protected http: HttpClient, protected sanitize: DomSanitizer) {
  }

  setPage(pageContent: string) {
    try {
      this.htmlContent = this.sanitize.bypassSecurityTrustHtml(pageContent);
    } catch (e) {
      console.error(e);
    }
  }

  async loadUrl(url: string, title = '') {
    try {
      this.loading = true;
      const html = await this.http.get(url, {
        responseType: 'text'
      }).toPromise();
      this.setPage(html);
      this.title = title;
    } catch (e) {
      console.error(e);
      this.activeModal.close();
    } finally {
      this.loading = false;
    }
  }
}
