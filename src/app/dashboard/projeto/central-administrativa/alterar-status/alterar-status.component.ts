import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {ProjetoStatus, Projeto, ResultadoResponse, RegistroREFP} from '@app/models';
import {zip} from 'rxjs';
import {FormGroup, FormControl} from '@angular/forms';
import {ProjetoFacade} from '@app/facades/index';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {LoggerDirective} from '@app/logger/logger.directive';

@Component({
    selector: 'app-alterar-status',
    templateUrl: './alterar-status.component.html',
    styles: []
})
export class AlterarStatusComponent implements OnInit {

    status: Array<ProjetoStatus>;
    projeto: ProjetoFacade;
    refpPendentes: Array<RegistroREFP> = [];
    form: FormGroup;
    catalogFC: FormControl;
    projetoStatus: number;

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    constructor(protected app: AppService) {
    }

    async ngOnInit() {
        this.projeto = await this.app.projetos.getCurrent();
        this.status = await this.app.catalogo.status().toPromise();
        this.projetoStatus = this.projeto.catalogStatusId;
        this.refpPendentes = await this.projeto.relations.REFP.registrosPendentes().toPromise();

        this.catalogFC = new FormControl(this.projeto.catalogStatusId);
        this.form = new FormGroup({
            id: new FormControl(this.projeto.id),
            catalogStatusId: this.catalogFC
        });
        this.catalogFC.valueChanges.subscribe(v => {
            this.projeto.catalogStatusId = parseInt(v, 10);
        });
    }

    async save() {

        if (this.projeto.catalogStatusId === 3 && this.refpPendentes.length > 0 && this.projetoStatus === 2) {
            const response = await this.app.confirm('Ainda existem registros REFPs pendentes de aprovação. Tem certeza que deseja mudar o status do projeto para encerrado?');
            if (!response) {
                this.catalogFC.setValue(this.projetoStatus);
                return;
            }
        }

        this.projeto.save().subscribe(async result => {
            if (result.sucesso) {
                this.projeto.catalogStatus = this.status.find(s => s.id === parseInt(this.catalogFC.value, 10));
                await this.app.alert('Status alterado com sucesso');
                this.app.router.navigate(['dashboard', 'projeto', this.projeto.id]);
                // this.logger.saveChanges();

            } else {
                this.app.alert(result.inconsistencias.join(', '), 'Erro!');
            }
        });
    }

    async changeStatus(event: Event) {


    }

    deletarProjeto() {
        this.app.prompt('Escreva DELETAR para excluir esse projeto', 'Tem certeza?').then(response => {
            if (response === 'DELETAR') {
                this.loading.show();
                this.app.projetos.removerProjeto(this.projeto.id).subscribe(result => {
                    if (result.sucesso) {
                        this.app.router.navigate(['dashboard']);
                    } else {
                        this.app.alert(result.inconsistencias);
                    }
                    this.loading.hide();
                });
            }
        }, error => {

        });
    }

}
