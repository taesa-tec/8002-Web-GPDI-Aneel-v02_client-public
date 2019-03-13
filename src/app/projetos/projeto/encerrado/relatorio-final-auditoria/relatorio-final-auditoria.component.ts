import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { ProjetoFacade } from '@app/facades';
import { RelatorioFinal } from '@app/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { timer } from 'rxjs';

@Component({
    selector: 'app-relatorio-final-auditoria',
    templateUrl: './relatorio-final-auditoria.component.html',
    styleUrls: []
})
export class RelatorioFinalAuditoriaComponent implements OnInit {

    projeto: ProjetoFacade;
    relatorio: RelatorioFinal;
    form: FormGroup;

    dynamicForm: { [propName: string]: boolean } | Object;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService) { }

    get errors() {
        const errs = [];
        if (this.form) {
            for (let k in this.form.controls) {
                if (this.form.controls[k]) {
                    const control = this.form.controls[k];
                    if (control.errors) {
                        errs.push({ field: k, errors: control.errors });
                    }
                }
            }
        }

        return errs;
    }

    ngOnInit() {

        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            this.obterRelatorioFinal();
        });
    }

    obterRelatorioFinal() {
        this.projeto.REST.RelatorioFinal.listar<RelatorioFinal>().subscribe(relatorio => {
            this.relatorio = relatorio;
            this.buildForm(relatorio);
        }, error => {
            this.buildForm();
        });
    }

    buildForm(relatorio?: RelatorioFinal) {
        this.form = new FormGroup({});
        if (relatorio) {
            this.form.addControl('id', new FormControl(relatorio.id));
        } else {
            this.form.addControl('projetoId', new FormControl(this.projeto.id));
        }

        ["produtoAlcancado", "justificativaProduto", "especificacaoProduto", "tecnicaPrevista", "justificativaTecnica",
            "descTecnica", "aplicabilidadePrevista", "justificativaAplicabilidade", "descTestes", "descAbrangencia",
            "descAmbito", "descAtividades"
        ].forEach(field => {
            const value = relatorio ? relatorio[field] : '';
            this.form.addControl(field, new FormControl(value, Validators.required))
        });
        this.configForm();
    }

    protected configForm() {
        this.dynamicForm = {};
        [
            'produtoAlcancado:false|justificativaProduto',
            'produtoAlcancado:true|especificacaoProduto',
            'tecnicaPrevista:false|justificativaTecnica',
            'tecnicaPrevista:true|descTecnica',
            'aplicabilidadePrevista:false|justificativaAplicabilidade',
            'aplicabilidadePrevista:true|descTestes|descAbrangencia|descAmbito'
        ].forEach(c => {
            const controls = c.split('|');
            const [controlBase, controlBaseValue] = controls.shift().split(':');

            controls.forEach(controlTargetKey => {

                Object.defineProperty(this.dynamicForm, controlTargetKey, {
                    get: () => String(this.form.get(controlBase).value) === controlBaseValue
                });

                const control = this.form.get(controlBase);
                const controlTarget = this.form.get(controlTargetKey);


                if (control) {



                    control.valueChanges.subscribe(value => {
                        if (String(value) === controlBaseValue) {
                            const controlValue = this.relatorio ? this.relatorio[controlTargetKey] : '';
                            this.form.addControl(controlTargetKey, new FormControl(controlValue, Validators.required));
                        } else {
                            this.form.removeControl(controlTargetKey);
                        }
                    });

                    timer(1).subscribe(t => {
                        if (String(controlTarget.value) === controlBaseValue) {
                            const controlValue = this.relatorio ? this.relatorio[controlTargetKey] : '';
                            this.form.addControl(controlTargetKey, new FormControl(controlValue, Validators.required));
                        } else {
                            this.form.removeControl(controlTargetKey);
                        }
                    });
                    
                    this.form.updateValueAndValidity();
                }
            });
        });
        this.form.updateValueAndValidity();
    }

    submit() {

        if (this.form.invalid) {
            return;
        }

        this.loading.show();
        const request = this.relatorio ?
            this.projeto.REST.RelatorioFinal.editar(this.form.value) :
            this.projeto.REST.RelatorioFinal.criar(this.form.value);


        request.subscribe(result => {
            if (result.sucesso) {
                this.app.alert("Salvo com sucesso");
            } else {
                this.app.alert(result.inconsistencias);
            }
            this.loading.hide();
        }, error => {
            this.loading.hide();
            this.app.alert(error);
        })
    }

}
