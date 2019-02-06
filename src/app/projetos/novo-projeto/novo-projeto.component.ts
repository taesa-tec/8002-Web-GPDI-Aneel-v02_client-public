import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosService } from '@app/projetos/projetos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjetoStatus, Empresa, ResultadoResponse } from '@app/models';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { Observable } from 'rxjs';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.scss']
})
export class NovoProjetoComponent implements OnInit {


  maxTituloContent = 500;

  resultado: ResultadoResponse;

  empresas: Observable<Array<Empresa>> = this.catalog.empresas();

  status = this.catalog.status();

  form = new FormGroup({
    Numero: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(6),
    ]),
    Titulo: new FormControl('', [
      Validators.maxLength(60),
      Validators.required
    ]),
    TituloDesc: new FormControl('', [
      Validators.maxLength(this.maxTituloContent),
      Validators.required
    ]),
    CatalogEmpresaId: new FormControl('', [Validators.required]),
    CatalogStatusId: new FormControl('', [Validators.required]),
  });

  public numeroPatterns = {
    'S': { pattern: /[A-Za-z]/, optional: true },
    '0': { pattern: /\d/, optional: false }
  };

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(public activeModal: NgbActiveModal, private projetoService: ProjetosService,
    protected catalog: CatalogsService, protected router: Router) { }

  get tituloDescRestante() {
    return this.maxTituloContent - this.tituloDesc.value.length;
  }

  get numero() {
    return this.form.get('numero');
  }

  get titulo() {
    return this.form.get('titulo');
  }
  get tituloDesc() {
    return this.form.get('tituloDesc');
  }
  get empresaProponente() {
    return this.form.get('empresaProponente');
  }

  ngOnInit() {

  }

  onSubmit() {

    this.loading.show();
    this.projetoService.criarProjeto(this.form.value).subscribe(resultado => {
      this.loading.hide();
      this.resultado = resultado;
      if (resultado.sucesso) {
        this.activeModal.close(resultado);
        this.router.navigate(['dashboard', 'projeto'])
      }
    });
  }

  save() {

  }

}
