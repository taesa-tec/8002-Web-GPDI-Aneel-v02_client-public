import {Component, OnInit, ViewChild} from '@angular/core';
import {Empresa, Segmento, TextValue} from '@app/models';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {zip} from 'rxjs';
import {LoadingComponent} from '@app/shared/loading/loading.component';
import {AppService} from '@app/app.service';
import {ProjetoFacade} from '@app/facades';
import {ScreenName} from '@app/decorators';
import {LoggerDirective} from '@app/logger/logger.directive';

@ScreenName({name: 'Projeto'})
@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: []
})

export class InfoComponent implements OnInit {

    projeto: ProjetoFacade;
    form: FormGroup;
    empresas: Array<Empresa>;
    compartilhamentos: Array<TextValue>;
    segmentos: Array<Segmento>;

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    public numeroPatterns = {
        'S': {pattern: /[A-Za-z]/, optional: true},
        '0': {pattern: /\d/, optional: false}
    };

    constructor(protected app: AppService) {
    }

    ngOnInit() {
        const empresas$ = this.app.catalogo.empresas();
        const segmentos$ = this.app.catalogo.segmentos();
        const compartilhamentos$ = this.app.catalogo.tipoCompartilhamento();
        const projeto$ = this.app.projetos.projetoLoaded;
        this.loading.show();

        zip(empresas$, segmentos$, projeto$, compartilhamentos$).subscribe(([empresas, segmentos, p, compartilhamentos]) => {
            this.empresas = empresas;
            this.segmentos = segmentos;
            this.compartilhamentos = compartilhamentos;
            this.projeto = p;

            this.form = new FormGroup({
                id: new FormControl(p.id, [Validators.required]),
                catalogStatusId: new FormControl(p.catalogStatusId, [Validators.required]),
                numero: new FormControl(p.numero, [Validators.required]),
                catalogEmpresaId: new FormControl(p.catalogEmpresaId, [Validators.required]),
                compartResultados: new FormControl(p.compartResultadosValor || '', [Validators.required]),
                titulo: new FormControl(p.titulo, [Validators.required]),
                tituloDesc: new FormControl(p.tituloDesc, [Validators.required]),
                codigo: new FormControl({value: p.codigo, disabled: true}),
            });

            if (this.projeto.isPD) {
                this.form.addControl('catalogSegmentoId', new FormControl(p.catalogSegmentoId || '', [Validators.required]));
                this.form.addControl('avaliacaoInicial', new FormControl(p.avaliacaoInicial || 'false'));
                this.form.addControl('motivacao', new FormControl(p.motivacao));
                this.form.addControl('originalidade', new FormControl(p.originalidade));
                this.form.addControl('aplicabilidade', new FormControl(p.aplicabilidade));
                this.form.addControl('relevancia', new FormControl(p.relevancia));
                this.form.addControl('razoabilidade', new FormControl(p.razoabilidade));
                this.form.addControl('pesquisas', new FormControl(p.pesquisas));
            }
            this.loading.hide();
        });
    }


    onSubmit() {
        if (this.form.valid) {
            this.app.projetos.editar(this.form.value).subscribe(resultado => {
                if (resultado.sucesso) {
                    this.app.alert('Salvo com sucesso');
                    this.projeto = Object.assign(this.projeto, this.form.value);
                    this.logger.saveUpdate();
                } else {
                    this.app.alert(resultado.inconsistencias);
                }
            });
        }
    }

}
