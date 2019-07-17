import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoriasContabeis, RecursoMaterial, TextValue} from '@app/models';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {AppService} from '@app/core/services/app.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ProjetoFacade} from '@app/facades/index';
import {LoggerDirective} from '@app/logger/logger.directive';

@Component({
    selector: 'app-recurso-material-form',
    templateUrl: './recurso-material-form.component.html',
    styles: []
})
export class RecursoMaterialFormComponent implements OnInit {

    categoriaContabel: Array<any> = CategoriasContabeis;
    form: FormGroup;
    projeto: ProjetoFacade;
    recursoMaterial: RecursoMaterial;

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    constructor(
        public activeModal: NgbActiveModal,
        protected app: AppService) {
    }

    get modalTitle() {
        return typeof this.recursoMaterial.id !== 'undefined' ? 'Editar Recurso Material' : 'Adicionar Recurso Material';
    }

    get buttonAction() {
        return typeof this.recursoMaterial.id !== 'undefined' ? {text: 'Salvar Alterações', icon: 'ta-save'} :
            {text: 'Adicionar Recurso Material', icon: 'ta-plus-circle'};
    }

    get atividades() {
        try {
            const currentCategoryValue = this.form ? this.form.get('catalogCategoriaContabilGestaoId').value : false;
            if (currentCategoryValue) {
                // const currentCategory = this.categoriaContabel.find(c => c.value === currentCategoryValue);
                const currentCategory = this.categoriaContabel.find(c => {
                    return c.value === currentCategoryValue;
                });
                if (currentCategory) {
                    return currentCategory.atividades.map(a => {
                        a.id = String(a.id);
                        return a;
                    });
                }
            }


        } catch (error) {
            console.log(error);
        }
        return [];
    }

    ngOnInit() {
        this.setup();

    }

    async setup() {
        const form = new FormGroup({
            projetoId: new FormControl(this.projeto.id, Validators.required),
            nome: new FormControl(this.recursoMaterial.nome || '', [Validators.required]),
            valorUnitario: new FormControl(this.recursoMaterial.valorUnitario || '', [Validators.required]),
            especificacao: new FormControl(this.recursoMaterial.especificacao || '', [Validators.required]),
        });

        if (this.recursoMaterial.id !== undefined) {
            form.addControl('id', new FormControl(this.recursoMaterial.id));
        }

        if (this.projeto.isPG) {

            const cats = <Array<any>>await this.app.catalogo.categoriasContabeisGestao().toPromise();

            this.categoriaContabel = cats.map(cat => {
                return {text: cat.nome, value: String(cat.id), atividades: cat.atividades};
            });
            const catalogCategoriaContabilGestaoId = new FormControl(String(this.recursoMaterial.catalogCategoriaContabilGestaoId || ''), [Validators.required]);
            form.addControl('catalogCategoriaContabilGestaoId', catalogCategoriaContabilGestaoId);
            form.addControl('catalogAtividadeId', new FormControl(this.recursoMaterial.catalogAtividadeId || '', [Validators.required]));
            catalogCategoriaContabilGestaoId.valueChanges.subscribe(v => {
                this.form.get('catalogAtividadeId').setValue('');
            });
        } else {
            form.addControl('categoriaContabil', new FormControl(this.recursoMaterial.categoriaContabilValor || '', [Validators.required]));
        }
        this.form = form;
    }


    submit() {
        if (this.form.valid) {
            const request = this.recursoMaterial.id ? this.app.projetos.editarRecursoMaterial(this.form.value) : this.app.projetos.criarRecursoMaterial(this.form.value);
            this.loading.show();
            request.subscribe(result => {
                if (result.sucesso) {
                    this.activeModal.close(result);
                    if (this.recursoMaterial.id) {
                        this.logger.saveUpdate();
                    } else {
                        this.logger.saveCreate();
                    }
                } else {
                    this.app.alert(result.inconsistencias.join(', '));
                }
                this.loading.hide();
            });
        }
    }

    excluir() {
        this.app.confirm('Tem certeza que deseja excluir este recurso material?', 'Confirmar Exclusão')
            .then(result => {
                if (result) {
                    this.loading.show();
                    this.app.projetos.delRecursoMaterial(this.recursoMaterial.id).subscribe(resultDelete => {
                        this.loading.hide();
                        if (resultDelete.sucesso) {
                            // this.logProjeto("Recursos Materiais", "Delete");
                            this.activeModal.close('deleted');
                            this.logger.saveDelete();
                        } else {
                            this.app.alert(resultDelete.inconsistencias.join(', '));
                        }
                    }, (error: HttpErrorResponse) => {
                        this.loading.hide();
                        this.app.alert(error.message);
                    });
                }

            });
    }

}
