import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SafeHtml} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalPageComponent implements OnInit {

  parser = new DOMParser();
  htmlContent: SafeHtml;

  protected _title = 'Detalhamento';
  get title() {
    return this._title;
  }

  set title(title: string) {
    this._title = title.length > 0 ? title : 'Detalhamento';
  }

  constructor(public activeModal: NgbActiveModal, protected http: HttpClient) {
  }

  async setPage(page: string) {
    try {
      this.htmlContent = await this.loadPage(page);
      const parsed = this.parser.parseFromString(this.htmlContent.toString(), 'text/html');
      this.title = parsed.head.innerText.trim();
    } catch (e) {
      console.error(e);
      throw new Error('Página não encontrada');
    }

  }

  async loadPage(page: string): Promise<string> {
    const content = await this.http.get(`${location.origin}/assets/pages/${page}.html`, {
      responseType: 'text'
    }).toPromise();
    return content;
  }


  ngOnInit() {
  }

}
