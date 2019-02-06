import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecursoHumanoFormComponent } from '@app/projetos/recurso-humano-form/recurso-humano-form.component';
import { ProjetosService } from '@app/projetos/projetos.service';

@Component({
  selector: 'app-extrato-financeiro-empresas',
  templateUrl: './extrato-financeiro-empresas.component.html',
  styleUrls: ['./extrato-financeiro-empresas.component.scss']
})
export class ExtratoFinanceiroEmpresasComponent implements OnInit {

  constructor(
    protected projetoService: ProjetosService,
    protected modalService: NgbModal
  ) { }

  openModal(id: number) {
    const modalRef = this.modalService.open(RecursoHumanoFormComponent, { size: 'lg' });
    modalRef.componentInstance.recurso_id = id;
  }

  ngOnInit() {
  }

}
