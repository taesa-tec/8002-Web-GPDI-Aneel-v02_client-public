import { Component, OnInit, Input } from '@angular/core';
import { LogProjeto } from '@app/models';
import { AppService } from '@app/app.service';
import { SafeUrl } from '@angular/platform-browser';

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
        console.log(this.log);
        this.app.file.toBlob(`/Users/${this.log.userId}/avatar`, this.log.userId).subscribe(avatar => {
            this.avatar = avatar;

        });


    }

}
