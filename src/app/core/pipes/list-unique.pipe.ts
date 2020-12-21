import {Pipe, PipeTransform} from '@angular/core';
import {listUnique} from "@app/core/functions";

@Pipe({
  name: 'listUnique'
})
export class ListUniquePipe implements PipeTransform {

  transform(list: Array<any>, includeValues: Array<any>, exceptValues: Array<any>, diff?: any): Array<any> {
    return listUnique(list, includeValues, exceptValues, diff);
  }
}
