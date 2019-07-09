import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {ProjetoFacade} from '@app/facades/index';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {FileUploaded} from '@app/models';

@Component({
    selector: 'app-logs-duto',
    templateUrl: './logs-duto.component.html',
    styles: []
})
export class LogsDutoComponent implements OnInit {

    projeto: ProjetoFacade;

    logsDUTO: Array<FileUploaded>;

    form = new FormGroup({
        file: new FormControl('', Validators.required)
    });
    listOrder: { field: string; direction: 'asc' | 'desc'; } = {
        field: 'nomeArquivo',
        direction: 'asc'
    };

    @ViewChild('sendFile') sendFileLoading: LoadingComponent;
    @ViewChild('loading') loading: LoadingComponent;

    constructor(protected app: AppService) {
    }

    async ngOnInit() {
        this.projeto = await this.app.projetos.getCurrent();


            this.loadData();

    }

    loadData() {
        this.loading.show();
        this.projeto.obterLogDuto().subscribe(logs => {
            this.loading.hide();
            this.logsDUTO = logs;
        });
    }

    sendLogFile(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = input.files;

        if (files && files.length > 0) {

            const file = files.item(0);
            if (file.type.match(/^text\/plain$/) === null) {
                this.app.alert('Somente arquivos .txt');
                event.preventDefault();
                return;
            }

            this.sendFileLoading.show();
            this.app.file.upload(file, new FormGroup({
                projetoId: new FormControl(this.projeto.id),
                categoria: new FormControl('LogDuto'),
            })).subscribe(result => {
                this.sendFileLoading.hide();
                if (result.sucesso) {
                    this.loadData();
                    this.app.alert('Log enviado com sucesso!');
                } else {
                    this.app.alert(result.inconsistencias.join(', '));
                }
            });

        }

    }

}
