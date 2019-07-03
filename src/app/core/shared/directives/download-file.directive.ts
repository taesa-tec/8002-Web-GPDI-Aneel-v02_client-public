import {Directive, HostListener, Input} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {FileUploaded} from '@app/models';

@Directive({
    selector: '[downloadFile]'
})
export class DownloadFileDirective {


    @Input() downloadFile: FileUploaded;

    constructor(protected app: AppService) {
    }

    @HostListener('click') clicked() {
        if (this.downloadFile) {
            this.app.file.download(this.downloadFile);
        }
    }

}
