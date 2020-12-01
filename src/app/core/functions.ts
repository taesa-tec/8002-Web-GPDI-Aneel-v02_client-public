import {get, set, defaultsDeep, difference, union} from 'lodash-es';

const comparators: { [f: string]: (arg1: any, arg2: any) => boolean } = {
  contain: (text: string, $term: string) => termMatch(text, $term) !== null,
  gt: (n1, n2) => n1 > n2,
  gte: (n1, n2) => n1 >= n2,
  lt: (n1, n2) => n1 < n2,
  lte: (n1, n2) => n1 <= n2,
  equal: (n1, n2) => n1 === n2,
};


export const removerAcentos = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
export const escapeRegExp = (str) => str.replace(/[.*+\-?^${}()|[\]\\/]/g, '\\$&');
export const termToSearch = (search) => search
  .split(/\s+/g).map(w => escapeRegExp(w)).join('\\s*')
  .normalize('NFD')
  .replace(/([\u0300-\u036f])/g, '')
  .replace(/([aeiouc])/g, '$1[\u0300-\u036f]?');

export function termMatch(text: string, search: string, caseSensitive = false) {
  if (!text) {
    return text;
  }
  if (!caseSensitive) {
    text = text.toLowerCase();
    search = search.toLowerCase();
  }
  text = text.normalize('NFD');
  search = termToSearch(search);
  const reg = new RegExp(search, 'g');
  return text.match(reg);

}

export function wrapTermMatch(text: string, search: string, before = '[', after = ']') {
  text = text.normalize('NFD');
  search = termToSearch(search);
  const reg = new RegExp(`(${search})`, 'gi');
  return text.replace(reg, `${before}$1${after}`);

}

export function recursiveSearch(hierarchicals: Array<any>, term: string | number, fields: Array<string>,
                                comparator: 'contain' | 'gt' | 'gte' | 'lt' | 'lte' | 'equal' = 'contain'): any[] {

  const list = hierarchicals.map(item => defaultsDeep({}, item));

  return list.filter(item => {

    const found = fields.map(field => {
      const $fields = field.split('.');
      const $field = get(item, $fields.length > 1 ? $fields[0] : field);
      if (!$field) {
        return false;
      }
      if (Array.isArray($field) && $field.length > 0) {
        const subsearch = recursiveSearch($field, term, $fields.length > 1 ? [$fields.slice(1).join('.')] : fields, comparator);
        set(item, $fields.length > 1 ? $fields[0] : field, subsearch);
        return subsearch.length > 0;
      }


      if (['string', 'number'].indexOf(typeof $field) > -1) {
        return comparators[comparator]($field, term);
      }
      return false;
    });

    return found.reduce((b1, b2) => b1 || b2);

  });

}

export function listUnique(list: Array<any>, includeValues: Array<any>, exceptValues: Array<any>, diff?: any): Array<any> {
  let $list = diff ? list.map(item => get(item, diff).toString()) : list;
  const available = difference($list, exceptValues.filter(e => e).map(e => e.toString()));
  $list = union(available, includeValues.map(i => i.toString()));
  return list.filter(item => (diff ? $list.indexOf(get(item, diff).toString()) : $list.indexOf(item)) > -1);
}

export function HtmlElementsIntersect(a: HTMLElement, b: HTMLElement): boolean {
  return RectIntersect(a.getBoundingClientRect(), b.getBoundingClientRect());
}

export function RectIntersect(a: DOMRect, b: DOMRect): boolean {
  return (a.y < b.bottom && b.y < a.bottom) && ((a.x < b.right && b.x < a.right));
}

