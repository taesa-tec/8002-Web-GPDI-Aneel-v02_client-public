import {InjectionToken, PipeTransform} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';
import {Pagination} from '@app/commons';

export interface TableActionEvent<T = any> {
  action: string;
  data: T;
}

export interface TableComponentCol<T = any> {
  title: string;
  field: string;
  value?: (item: T) => any;
  template?: string | ((item: T) => string);
  order?: boolean;
  orderType?: 'number' | 'date' | 'alpha';
  priority?: number;
  type?: string;
  pipe?: string | PipeTransform;
  width?: string;
  permission?: string | Array<string>;
}

export type TableComponentCols<T = any> = Array<TableComponentCol<T>>;

export class TableComponentRow {
  selected = false;
  rendered: { [key: string]: string | SafeHtml } = {};
  value: { [key: string]: string | object } = {};
  originalValue: { [key: string]: any } = {};
  protected propToArray = prop => Object.keys(prop)
    .filter(key => key in prop && prop[key])
    .map(key => prop[key]);


  valueToArray = () => this.propToArray(this.value);
  originalValueToArray = () => this.propToArray(this.value);
  toArray = () => this.propToArray(this.data);

  constructor(public data: any) {
  }

  toggleSelect() {
    this.selected = !this.selected;
  }


}

export interface TableComponentAction {
  text: string;
  action: string;
  icon?: string;
  className?: string;
  permission?: string;
  isLink?: boolean;
  isGroupAction?: boolean;
}

export type TableComponentActions = Array<TableComponentAction>;

export interface TableComponentOrder {
  field: string;
  direction: 'asc' | 'desc';
}

export interface TableComponentFilter {
  field: string;
  options: Array<{ text: string; value: string }>;
  value?: any;
  class?: string;
  filter?: (item: any, value: string) => boolean;
}

export interface TableComponentOptions<T = any> {
  buttons?: TableComponentActions;
  columns: TableComponentCols<T>;
  filter?: Array<TableComponentFilter>;
  hasSelect?: boolean;
}

export interface TableCellData {
  originalValue: any;
  value: string | object;
  slug: string;
  col: TableComponentCol;
}

export interface TableOrder {
  field: string;
  direction: 'asc' | 'desc';
  type?: 'date' | 'number' | 'alpha';
}

export type TableDataRequester<T = any> = (page?: number, filter?: Array<TableComponentFilter>, order?: Array<TableOrder>, search?: string)
  => Promise<Pagination<T>>;

export const TABLE_COLS = new InjectionToken<TableComponentCols>('Colunas da tabela');
export const TABLE_ACTIONS = new InjectionToken<TableComponentActions>('Botões da tabela');
export const TABLE_DATA_REQUEST = new InjectionToken<TableDataRequester>('Metodo de requisição de dados da tabela');
