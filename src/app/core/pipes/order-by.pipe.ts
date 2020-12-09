import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash-es';
import { Many } from 'lodash';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform(value: Array<any> | Object, fields: string, order?: Many<boolean | 'asc' | 'desc'>): any {
        return orderBy(value, fields, order);
    }

}
