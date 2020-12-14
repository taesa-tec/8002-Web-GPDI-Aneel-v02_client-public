import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from '@app/core/components/loading/loading.component';
import { AppService } from '@app/services/app.service';
import { User } from '@app/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-painel-demandas',
    templateUrl: './painel-demandas.component.html',
    styleUrls: ['./painel-demandas.component.scss']
})
export class PainelDemandasComponent implements OnInit {

    @ViewChild(LoadingComponent)
    private loading: LoadingComponent;

    currentUser: User;
    projetos: any;
    m: Array<any>;


    constructor(protected app: AppService, protected modal: NgbModal) {
    }

    logout() {
        this.app.auth.logout();
    }

    ngOnInit() {
        // this.app.users.currentUserUpdated.subscribe(user => {
        //     this.currentUser = user;
        // });
        this.contaProjetos();
        this.m = [
            { text: 'Gestão de Demandas', qtd: '(25)', icon: 'ta-projeto', path: 'gestao-de-demandas' },
            { text: 'Projetos Em Proposta', qtd: '(5)', icon: 'ta-projeto', path: 'projeto-proposta' },
            { text: 'Projetos Em Execução', qtd: '(3)', icon: 'ta-box', path: 'projeto-iniciado' },
            { text: 'Projetos Em Finalização', qtd: '(2)', icon: 'ta-ficha', path: 'projeto-encerrado' },
            { text: 'Configurações do Sistema', icon: 'ta-gear', path: 'configuracoes-do-sistema' },
            { text: 'Dashboard Antigo', icon: 'ta-recurso-material', path: 'meus-projetos' }
        ]
    }

    contaProjetos() {
        this.projetos = this.app.projetos.meusProjetos().toPromise();
    }

}
