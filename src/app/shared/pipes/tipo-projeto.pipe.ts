import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoProjeto'
})
export class TipoProjetoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? (value.match(/^9.+/) ? "Projeto Administrativo" : "Projeto Científico") : value;
  }

}
