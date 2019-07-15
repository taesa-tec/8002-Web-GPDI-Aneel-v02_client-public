import {Component, OnInit, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import {CatalogsService} from '@app/core/services/catalogs.service';
import {AppService} from '@app/core/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {ProjetosService} from '@app/core/services/projetos.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {zip, of} from 'rxjs';
import {Projeto, Tema, SubTema, SubTemaRequest, TemaProjeto, NoRequest, ResultadoResponse, CatalogTema, NiveisUsuarios} from '@app/models';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {LoggerDirective} from '@app/logger/logger.directive';

@Component({
    selector: 'app-temas',
    templateUrl: './temas.component.html',
    styles: []
})
export class TemasComponent implements OnInit {

    projeto: Projeto;

    temaProjeto: TemaProjeto;

    temas: Array<CatalogTema>;
    // Form
    form: FormGroup;
    formFile: FormGroup;
    temaControl = new FormControl('', [Validators.required]);
    subTemasForms = new FormArray([]);

    @ViewChild(LoadingComponent) loading;
    @ViewChild('file') file: ElementRef;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

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

    subtemasdisponiveis(current?: any) {
        return this.subTemas.filter(tema => {
            return this.selectedsThemes.indexOf(tema.subTemaId) === -1 || (current && parseFloat(current) === tema.subTemaId);
        });
    }

    isOther(subTemaId) {
        const subtema = this.subTemas ? this.subTemas.find(st => st.subTemaId === parseInt(subTemaId, 10)) : null;
        return subtema && subtema.nome.match(/^Outros?\.?$/g) !== null;
    }

    async ngOnInit() {
        this.loading.show();

        this.temas = await this.catalogo.temas().toPromise();
        this.projeto = await this.app.projetos.getCurrent();
        await this.load();
        this.loading.hide();
    }

    async load() {
        this.temaProjeto = await this.projetoService.getTema(this.projeto.id).toPromise();
        this.setupForm(this.projeto, this.temaProjeto);
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
        this.form.updateValueAndValidity();
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
                this.app.alert('Tema atualizado com sucesso');
                if (this.temaProjeto) {
                    this.logger.saveUpdate();
                } else {
                    this.logger.saveCreate();
                }
            } else {
                this.app.alert(resultado.inconsistencias.join(', '));
            }
        });
    }

    sendFile(id?) {
        const el = this.file.nativeElement as HTMLInputElement;
        const temaId = id || this.temaProjeto.id;

        if (el.files.length > 0) {
            return this.app.file.upload(el.files.item(0), new FormGroup({
                temaId: new FormControl(temaId),
            })).pipe(tap(result => {
                if (result.sucesso) {
                    this.logger.save(`Arquivo ${el.files.item(0).name} adicionado`);
                    this.file.nativeElement.value = '';
                }
            }));
        }

        return of(NoRequest);
    }

    deletarArquivo(file) {
        this.app.confirm('Tem certeza que deseja remover este arquivo?').then(response => {
            if (response) {
                this.loading.show();
                this.temaProjeto.uploads.splice(this.temaProjeto.uploads.indexOf(file), 1);
                this.app.file.remover(file).subscribe((result: ResultadoResponse) => {
                    this.loading.hide();
                    if (result.sucesso) {
                        this.app.alert('Excluido com sucesso');
                    } else {
                        this.app.alert(result.inconsistencias, 'Erro');
                    }
                }, error => {
                    this.loading.hide();
                });
            }
        });

    }

}
