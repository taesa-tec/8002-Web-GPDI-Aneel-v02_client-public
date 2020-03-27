import {Pipe, PipeTransform} from '@angular/core';
import * as fileSize from 'filesize';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (isNaN(value)) {
      return '';
    }
    return fileSize(value);
  }

}
