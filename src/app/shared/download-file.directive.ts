import { Directive, HostListener, Input } from '@angular/core';
import { FileService } from './file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppService } from '@app/app.service';

@Directive({
    selector: '[downloadFile]'
})
export class DownloadFileDirective {


    @Input() downloadFile;

    constructor(protected app: AppService) { }

    @HostListener('click') clicked() {
        if (this.downloadFile) {
            this.app.file.download(this.downloadFile).subscribe(result => {
                console.log(result);
            }, (error: HttpErrorResponse) => {
                if (error.status === 404) {
                    this.app.alert("Arquivo Não encontrado");
                } else {
                    this.app.alert(error.message);
                }
            });
        }
    }

}
