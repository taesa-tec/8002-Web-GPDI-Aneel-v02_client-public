import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'n2array'
})
export class N2arrayPipe implements PipeTransform {

    transform(value: any, start: number = 0): Array<number> {
        return Array(parseInt(value, 10)).fill(0).map((v, i) => start + i);
    }

}
