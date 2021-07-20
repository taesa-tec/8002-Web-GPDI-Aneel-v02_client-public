import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'n2array'
})
export class N2arrayPipe implements PipeTransform {

  transform(value: any, start: number = 0): Array<number> {
    const count = parseInt(value, 10);
    if (count) {
      return Array(count).fill(0).map((v, i) => start + i);
    }
    return [];
  }

}
