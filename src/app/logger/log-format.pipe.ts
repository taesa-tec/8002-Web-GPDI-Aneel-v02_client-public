import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'logFormat'
})
export class LogFormatPipe implements PipeTransform {

    transform(item: { type: string; valor: any; titulo: string }, args: any = {}): any {

        const { type, valor } = item;


        switch (type) {
            case 'System.DateTime':
                return moment(valor).format(args.format || 'DD [de] MMMM [de] YYYY');
            case 'System.Decimal':
                return (<Number>valor).toFixed(2).replace('.', '.');
            case 'System.Boolean':
                return valor ? "Sim" : "Não";
            default:
                return (valor && valor.toString()) || '';

        }
    }

}
