import {Pipe, PipeTransform} from '@angular/core';
import FilesizeFunc from 'filesize';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (isNaN(value)) {
      return '';
    }
    return FilesizeFunc(value);
  }

}
