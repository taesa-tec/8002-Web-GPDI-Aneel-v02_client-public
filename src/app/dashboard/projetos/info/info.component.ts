import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetosService } from '@app/projetos/projetos.service';
import { Projeto, Empresa, ProjetoCompartilhamento } from '@app/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  projeto: Projeto;
  form: FormGroup;
  empresas: Array<Empresa>;
  compartilhamentos: Array<{ nome: string, valor: ProjetoCompartilhamento }>;
  segmentos: Array<{ nome: string; valor: string; }>;

  @ViewChild(LoadingComponent) loading: LoadingComponent;


  constructor(private route: ActivatedRoute, private projetoService: ProjetosService, protected catalogo: CatalogsService) { }

  ngOnInit() {

    const empresas$ = this.catalogo.empresas();
    const segmentos$ = this.catalogo.segmentos();
    const compartilhamentos$ = this.catalogo.tipoCompartilhamento();
    const projeto$ = this.route.parent.data.pipe(map(d => d.projeto));
    this.loading.show();

    zip(empresas$, segmentos$, projeto$, compartilhamentos$).subscribe(([empresas, segmentos, p, compartilhamentos]) => {
      this.empresas = empresas;
      this.segmentos = segmentos;
      this.compartilhamentos = compartilhamentos;
      this.projeto = p;
      this.form = new FormGroup({
        numero: new FormControl(p.numero, [Validators.required]),
        catalogEmpresaId: new FormControl(p.catalogEmpresaId, [Validators.required]),
        titulo: new FormControl(p.titulo, [Validators.required]),
        tituloDesc: new FormControl(p.tituloDesc, [Validators.required]),
        catalogSegmentoId: new FormControl(p.catalogSegmentoId || ''),
        avaliacaoInicial: new FormControl(p.avaliacaoInicial || ''),
        compartResultados: new FormControl(p.compartResultados || ''),
        codigo: new FormControl({ value: p.codigo, disabled: true }),
        motivacao: new FormControl(p.motivacao),
        originalidade: new FormControl(p.originalidade),
        aplicabilidade: new FormControl(p.aplicabilidade),
        relevancia: new FormControl(p.relevancia),
        razoabilidade: new FormControl(p.razoabilidade),
        pesquisas: new FormControl(p.pesquisas),
      });

      this.loading.hide();
    });


  }

  onSubmit() {
    console.log(this.form.value);
  }

}
