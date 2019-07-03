import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'notDefined'
})
export class NotDefinedPipe implements PipeTransform {

    transform(value: any, text: string = "Não definido"): any {
        if (value) {
            if (typeof value === 'string' && value.length === 0) {
                return text;
            }
            return value;
        }
        return text;

    }

}
