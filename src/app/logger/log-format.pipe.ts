import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'logFormat'
})
export class LogFormatPipe implements PipeTransform {

    transform(item: { type: string; valor: any; titulo: string }, args: any = {}): any {

        const {type, valor} = item;


        switch (type) {
            case 'System.DateTime':
                return moment(valor).format(args.format || 'DD [de] MMMM [de] YYYY');
            default:
                return valor.toString();

        }
    }

}
