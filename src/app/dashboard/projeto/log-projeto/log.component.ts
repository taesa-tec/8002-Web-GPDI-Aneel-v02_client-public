import { Component, OnInit, Input } from '@angular/core';
import { LogProjeto } from '@app/models';
import { AppService } from '@app/core/services/app.service';
import { SafeUrl } from '@angular/platform-browser';
import {environment} from '@env/environment';

@Component({
    selector: 'app-log-item',
    templateUrl: './log.component.html',
    styles: []
})
export class LogComponent implements OnInit {

    @Input() log: LogProjeto;

    avatar: SafeUrl;

    constructor(protected app: AppService) { }

    ngOnInit() {
        this.avatar = `${environment.api_url}/Users/${this.log.userId}/avatar`;
        // this.app.file.toBlob(`Users/${this.log.userId}/avatar`, this.log.userId).subscribe(avatar => {
        //     this.avatar = avatar;
        // });


    }

}
