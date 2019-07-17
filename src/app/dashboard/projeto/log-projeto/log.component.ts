import {Component, OnInit, Input} from '@angular/core';
import {LogProjeto} from '@app/models';
import {AppService} from '@app/core/services/app.service';
import {SafeUrl} from '@angular/platform-browser';
import {environment} from '@env/environment';

@Component({
    selector: 'app-log-item',
    templateUrl: './log.component.html',
    styles: []
})
export class LogComponent implements OnInit {

    @Input() log: LogProjeto;

    avatar: SafeUrl;

    constructor(protected app: AppService) {
    }

    ngOnInit() {
        this.avatar = `${environment.api_url}/Users/${this.log.userId}/avatar`;
    }

    get hasLogDataStatusNovo() {
        return this.log.data.statusNovo !== null && this.log.data.statusNovo.length > 0;
    }

    get hasLogDataStatusAnterior() {
        return this.log.data.statusAnterior !== null && this.log.data.statusAnterior.length > 0;
    }

    get hasStatusAnterior() {
        return (this.log.statusAnterior.trim().length > 0 && this.logDataStatusAnterior === null) || this.hasLogDataStatusAnterior;
    }

    get hasStatusNovo() {
        return (this.log.statusNovo.trim().length > 0 && this.logDataStatusNovo === null) || this.hasLogDataStatusNovo;
    }

    get logDataStatusAnterior() {
        return this.log.data.statusAnterior;
    }

    get logDataStatusNovo() {
        return this.log.data.statusNovo;
    }

    get logStatusAnterior() {
        return this.log.statusAnterior;
    }

    get logStatusNovo() {
        return this.log.statusNovo;
    }

}
