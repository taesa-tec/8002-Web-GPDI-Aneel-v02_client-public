import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@app/app.service';
import { ProjetoFacade } from '@app/projetos/projeto.facade';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { FileUploaded } from '@app/models';

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

    constructor(protected app: AppService) { }

    ngOnInit() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            this.loadData();
        });
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
            this.sendFileLoading.show();
            const file = files.item(0);
            this.app.file.upload(file, new FormGroup({
                projetoId: new FormControl(this.projeto.id),
                categoria: new FormControl('LogDuto'),
            })).subscribe(result => {
                this.sendFileLoading.hide();
                if (result.sucesso) {
                    this.loadData();
                    this.app.alert("Log enviado com sucesso!");
                } else {
                    this.app.alert(result.inconsistencias.join(', '));
                }
            });

        }

    }

}
