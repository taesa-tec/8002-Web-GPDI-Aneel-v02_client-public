import {PipeTransform} from '@angular/core';

export interface TableActionEvent<T = any> {
  action: string;
  data: T;
}

export interface TableComponentCol<T = any> {
  title: string;
  field: string;
  value?: (item: T) => any;
  order?: boolean;
  type?: string;
  pipe?: string | PipeTransform;
}

export type TableComponentCols<T = any> = Array<TableComponentCol<T>>;

export class TableComponentRow {
  selected = false;
  rendered = {};

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
}

export interface TableComponentOptions<T = any> {
  buttons?: TableComponentActions;
  columns: TableComponentCols<T>;
  filter?: Array<TableComponentFilter>;
  hasSelect?: boolean;
}

