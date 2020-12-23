import {Directive, HostListener, Input} from '@angular/core';
import {AppService} from '@app/services/app.service';
import {FileUploaded} from '@app/commons';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[downloadFile]'
})
export class DownloadFileDirective {


  @Input() downloadFile: FileUploaded;

  constructor(protected app: AppService) {
  }

  @HostListener('click') clicked() {
    console.log('Remover');
    if (this.downloadFile) {
      this.app.file.download(this.downloadFile);
    }
  }

}
