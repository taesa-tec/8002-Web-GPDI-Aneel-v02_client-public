import {termMatch} from './functions';
import {Searchable} from '@app/commons';

export class Searchables<T> extends Array<Searchable<T>> {
  constructor() {
    super();
  }

  search(term: string): Array<T> {
    let result: Array<Searchable<T>> = [...this];
    if (term.trim().length !== 0) {
      result = this.filter(item => item.texts.find(txt => termMatch(txt, term)));
    }
    // Quebrar referencia
    return JSON.parse(JSON.stringify(result.map(item => item.item)));
  }
}
