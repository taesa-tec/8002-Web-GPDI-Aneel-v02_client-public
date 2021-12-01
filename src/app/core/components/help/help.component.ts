import {Component, Input, ViewChild, HostListener, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {ModalPageComponent} from '@app/core/components/modal-page/modal-page.component';
import {AppService, AuthService} from '@app/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html'
  ,
  styles: [
    'i{font-size:80%}'
  ]
})
export class HelpComponent {
  private _codigo;
  private subscription: Subscription = null;
  loading = true;
  ctrl = false;

  @ViewChild('tooltip') tooltip: NgbTooltip;


  @Input('codigo') codigo: string;

  item: {
    id: number;
    codigo: string;
    descricao: string;
    hasContent: boolean;
    nome: string;
  };
  @Input() placement: any = 'top';

  constructor(
    protected app: AppService,
    protected router: Router,
    protected http: HttpClient,
    protected element: ElementRef, protected modal: NgbModal, protected auth: AuthService) {
  }

  getMessage() {
    if (this.subscription !== null || this.codigo.trim().length === 0) {
      return;
    }
    this.loading = true;
    this.subscription = this.http.get<any>(`Ajuda/${this.codigo}`)
      .subscribe(item => {
        this.item = item;
        this.loading = false;
      });
  }

  async openContent() {
    const ref = this.modal.open(ModalPageComponent, {size: 'xl'});
    const cmp = ref.componentInstance as ModalPageComponent;
    await cmp.loadUrl(`Ajuda/${this.codigo}/Conteudo`, 'Ajuda');
    await ref.result;
  }

  @HostListener('mouseover', ['$event'])
  over(evt: MouseEvent) {
    this.ctrl = evt.ctrlKey;
    this.getMessage();
    if (!this.tooltip.isOpen()) {
      this.tooltip.closeDelay = 1000;
      this.tooltip.open();
    }
  }

  @HostListener('mouseout')
  out() {
    if (this.tooltip.isOpen()) {
      this.tooltip.close();
    }
  }

  @HostListener('click', ['$event'])
  click(evt: MouseEvent) {
    if (evt.ctrlKey && this.auth.getUser().role === 'Administrador') {
      evt.preventDefault();
      this.app.confirm('Deseja editar este item de ajuda?', `Editar item de ajuda (${this.item.codigo})?`).then(editar => {
        if (editar) {
          this.router.navigate([`/configuracoes/ajuda/`], {fragment: this.item.id.toString()}).then();
        }
      });
    } else if (this.item.hasContent) {
      evt.preventDefault();
      this.openContent().then();
    }
  }


}
