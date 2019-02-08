import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { AppService } from '@app/app.service';
import { ActivatedRoute } from '@angular/router';
import { ProjetosService } from '@app/projetos/projetos.service';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';
import { Projeto, Tema, SubTema, SubTemaRequest, TemaProjeto } from '@app/models';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SubTemasComponent } from './sub-tema.component';
import { LoadingComponent } from '@app/shared/loading/loading.component';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss']
})
export class TemasComponent implements OnInit {

  projeto: Projeto;
  temaProjeto: TemaProjeto;

  temas: Array<Tema>;
  // Form
  form: FormGroup;
  temaControl = new FormControl('', [Validators.required]);
  subTemasForms = new FormArray([]);

  @ViewChild(SubTemasComponent) subTemasComponent;
  @ViewChild(LoadingComponent) loading;

  get tema() {
    return this.temas ? this.temas.find(t => t.id === parseInt(this.temaControl.value, 10)) : null;
  }

  get subTemas() {
    return this.tema ? this.tema.subTemas : [];
  }

  constructor(
    private app: AppService,
    private route: ActivatedRoute,
    private projetoService: ProjetosService,
    protected catalogo: CatalogsService) {
  }

  ngOnInit() {
    this.loading.show();
    const temas$ = this.catalogo.temas();
    const projeto$ = this.route.parent.data.pipe(map(d => d.projeto));

    zip(temas$, projeto$).subscribe(([temas, projeto]) => {
      this.temas = temas;
      this.projeto = projeto;
      this.projetoService.getTema(projeto.id).subscribe(temaProjeto => {
        this.temaProjeto = temaProjeto;
        this.setupForm(this.projeto, temaProjeto);
        this.loading.hide();
      });
    });
  }

  protected setupForm(projeto: Projeto, temas: TemaProjeto = null) {

    this.form = new FormGroup({
      projetoId: new FormControl(projeto.id, [Validators.required]),
      catalogTemaId: this.temaControl,
      outroDesc: new FormControl(temas ? (temas.outroDesc || '') : ''),
      subTemas: this.subTemasForms
    });

    this.temaControl.valueChanges.subscribe(value => {
      if (this.tema.valor === 'OU') {
        this.form.addControl('outroDesc', new FormControl('', [Validators.required]));
      } else {
        this.form.removeControl('outroDesc');
      }
      this.reset();
    });



    if (temas) {
      this.form.addControl('Id', new FormControl(temas.id));
      this.form.get('catalogTemaId').setValue(temas.catalogTemaId);
      this.reset(false);
      temas.subTemas.forEach(s => {
        this.addSubTema(s);
      });
    }
  }

  protected reset(keepOne = true) {
    // this.subTemasForms.reset();
    while (this.subTemasForms.length > 0) {
      this.subTemasForms.removeAt(0);
    }
    if (this.tema && keepOne) {
      this.addSubTema();
    }
  }


  addSubTema(subtema?: SubTema) {

    const id = subtema ? subtema.catalogSubTemaId || '' : '';
    const outroDesc = subtema ? subtema.outroDesc || '' : '';

    const f = new FormGroup({
      catalogSubTemaId: new FormControl(id, [Validators.required]),
      outroDesc: new FormControl(outroDesc)
    });
    this.subTemasForms.push(f);
  }
  delete(i: number) {
    if (this.subTemasForms.length > 1) {
      this.subTemasForms.removeAt(i);
    }
  }

  updateTemas() {
    this.loading.show();
    const request = this.temaProjeto ? this.projetoService.editTema(this.form.value) : this.projetoService.criarTema(this.form.value);

    request.subscribe(resultado => {
      this.loading.hide();
      if (resultado.sucesso) {
        this.app.alert("Tema atualizado com sucesso");
      } else {
        this.app.alert(resultado.inconsistencias.join(", "));
      }
    });

  }

}
