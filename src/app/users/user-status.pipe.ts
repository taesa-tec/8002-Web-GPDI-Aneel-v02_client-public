import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value === 0 ? "Desativo" : "Ativo";
    }

}

