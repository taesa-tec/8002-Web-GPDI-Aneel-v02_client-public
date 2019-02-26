import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CatalogsService } from '@app/catalogs/catalogs.service';
import { AppService } from '@app/app.service';
import { ActivatedRoute } from '@angular/router';
import { ProjetosService } from '@app/projetos/projetos.service';
import { map, mergeMap, tap } from 'rxjs/operators';
import { zip, of } from 'rxjs';
import { Projeto, Tema, SubTema, SubTemaRequest, TemaProjeto, NoRequest } from '@app/models';
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
    formFile: FormGroup;
    temaControl = new FormControl('', [Validators.required]);
    subTemasForms = new FormArray([]);

    @ViewChild(SubTemasComponent) subTemasComponent;
    @ViewChild(LoadingComponent) loading;
    @ViewChild('file') file: ElementRef;

    get tema() {
        return this.temas ? this.temas.find(t => t.id === parseInt(this.temaControl.value, 10)) : null;
    }

    get subTemas() {
        return this.tema ? this.tema.subTemas : [];
    }

    get selectedsThemes() {
        return (this.subTemasForms.value as Array<any>).map(i => parseInt(i.catalogSubTemaId, 10));
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
        const projeto$ = this.app.projetos.projetoLoaded;

        zip(temas$, projeto$).subscribe(([temas, projeto]) => {
            this.temas = temas;
            this.projeto = projeto;
            this.load();
        });
    }

    load() {
        this.projetoService.getTema(this.projeto.id).subscribe(temaProjeto => {
            this.temaProjeto = temaProjeto;
            this.setupForm(this.projeto, temaProjeto);
            this.loading.hide();
        });
    }

    changeFile(event) {
        // console.log({ event });
    }

    protected setupForm(projeto: Projeto, temas: TemaProjeto = null) {

        this.form = new FormGroup({
            projetoId: new FormControl(projeto.id, [Validators.required]),
            catalogTemaId: this.temaControl,
            outroDesc: new FormControl(temas ? (temas.outroDesc || '') : ''),
            subTemas: this.subTemasForms
        });

        this.formFile = new FormGroup({
            file: new FormControl('')
        });

        this.temaControl.valueChanges.subscribe(value => {
            if (this.tema && this.tema.valor === 'OU') {
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

        const request =
            (this.temaProjeto ? this.projetoService.editTema(this.form.value) : this.projetoService.criarTema(this.form.value))
                .pipe(mergeMap(result => {
                    console.log({ result });

                    if (result.sucesso) {
                        if (result.id) {
                            return this.sendFile(result.id);
                        }
                        return this.sendFile();

                    }
                    return of(result);
                }));

        request.subscribe(resultado => {
            this.loading.hide();
            if (resultado.sucesso) {
                this.load();
                this.app.alert("Tema atualizado com sucesso");
            } else {
                this.app.alert(resultado.inconsistencias.join(", "));
            }
        });
    }
    sendFile(id?) {
        const el = this.file.nativeElement as HTMLInputElement;
        const temaId = id || this.temaProjeto.id;

        console.log({ temaId });

        if (el.files.length > 0) {
            return this.app.file.upload(el.files.item(0), new FormGroup({
                temaId: new FormControl(temaId),
            })).pipe(tap(result => {
                if (result.sucesso) {
                    this.file.nativeElement.value = "";
                }
            }));
        }

        return of(NoRequest);
    }

}
