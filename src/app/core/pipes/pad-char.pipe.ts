import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pad'
})
export class PadCharPipe implements PipeTransform {

  transform(value: string | number, fill: string, maxLength: number, start = true): any {
    value = value.toString();
    return start ? value.padStart(maxLength, fill) : value.padEnd(maxLength, fill);
  }

}
