import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit, NgModule, Compiler, Injector, NgModuleRef, ViewContainerRef} from '@angular/core';
import {TableActionEvent, TableComponentActions, TableComponentCols, TableComponentRow, TableComponentOptions, TableComponentFilter, TableComponentCol} from './table';
import {at, orderBy, kebabCase, result} from 'lodash-es';
import {SafeUrl, DomSanitizer} from '@angular/platform-browser';
import {CurrencyPipe, CommonModule} from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {


  @Input() listOrder: { field: string; direction: 'asc' | 'desc'; } = {field: 'id', direction: 'asc'};

  protected _data: Array<TableComponentRow> = [];

  // Botões
  _buttons: TableComponentActions = [];
  _groups_buttons: TableComponentActions = [];

  actionGroup = '';

  currentData: Array<TableComponentRow> = [];

  showSelect = false;
  @Input() showHeader = true;

  @Input() itemIdentity = 'id';
  // Selector
  @Input() hasSelect = false;
  // Colunas
  @Input() cols: TableComponentCols;
  // Filtros
  @Input() filters: Array<TableComponentFilter> = [];

  @Input() set options(value: TableComponentOptions) {
    this.buttons = value.buttons || this.buttons;
    this.cols = value.columns || this.cols;
    this.filters = value.filter || this.filters;
    this.hasSelect = value.hasSelect !== undefined ? value.hasSelect : this.hasSelect;
  }

  @Input() emptyText = 'Lista Vazia';


  @Input() set buttons(value: TableComponentActions) {
    if (value) {
      this._buttons = value.filter(b => !b.isGroupAction);
      this._groups_buttons = value.filter(b => b.isGroupAction);
    }
  }

  // Data
  @Input() set data(value: Array<any>) {
    if (value && Array.isArray(value)) {
      this._data = value.map(data => new TableComponentRow(data));
      this.setCurrentData();
    }
  }

  get data() {
    return this.getData();
  }

  get selection() {
    return this.currentData.filter(item => item.selected).map(item => item.data);
  }

  get allSelected() {
    return this.currentData.length > 0 && this.selection.length === this.currentData.length;
  }

  get colLength() {
    return this.cols.length + (this._buttons.length > 0 ? 1 : 0) + (this.hasSelect ? 1 : 0);
  }

  @Output() action: EventEmitter<TableActionEvent> = new EventEmitter<TableActionEvent>();

  constructor(protected sanitizer: DomSanitizer) {
  }

  getData() {
    this._data.forEach(row => {
      row.rendered = {};
      if (this.cols) {
        this.cols.forEach(col => {
          row.rendered[col.field] = this.getFieldValue(col, row.data);
        });
      }
    });
    let filtered_data = this._data;
    this.filters.forEach(f => {
      if (f.value || f.value !== '') {
        filtered_data = filtered_data.filter(item => String(at<any>(item, `data.${f.field}`)) === f.value);
      }
    });

    return orderBy(filtered_data, `data.${this.listOrder.field}`, this.listOrder.direction);
  }

  reorderItems(order) {
    this.listOrder = order;
    this.setCurrentData();
  }

  setCurrentData() {
    this.currentData = this.getData();
    this.showSelect = this.hasSelect && this._groups_buttons.length > 0;
  }

  trackFunc(index, item) {
    if (this.itemIdentity && at(item.data, this.itemIdentity)) {
      return at(item.data, this.itemIdentity);
    } else {
      return index;
    }
  }

  itemClick(event, item: TableComponentRow) {
    try {
      if (this.hasSelect && event.target.tagName === 'TD') {
        item.toggleSelect();
      }
    } catch (e) {
      console.log(e);

    }

  }

  toggleGroupSelect() {
    const allSelected = this.allSelected;
    const count = this.selection.length;
    this.data.forEach(item => {
      item.selected = allSelected ? false : count === 0;
    });
  }

  doAction(action: string, data: any) {
    this.action.emit({action, data});
  }

  doActionGroup(action: string, data: any) {
    this.actionGroup = '';
    this.doAction(action, data);
  }

  protected getSlugAndValue(col: TableComponentCol, item) {
    return {
      value: (col.value && col.value(item)) || at(item, col.field)[0] || '',
      slug: kebabCase(col.field)
    };
  }


  protected toImage(col: TableComponentCol, item, asBackground = false) {
    const {value, slug} = this.getSlugAndValue(col, item);
    if (asBackground) {
      return this.sanitizer.bypassSecurityTrustHtml(`<div style="background-image:url(${value})" class="table-field-imagebg-${slug}" />`);
    }
    return `<img src="${value}" alt="Imagem" class="table-field-image-${slug}" />`;
  }

  protected toSimple(col: TableComponentCol, item) {
    const {value, slug} = this.getSlugAndValue(col, item);
    return `<span class="table-field-${col.type || 'default'}-${slug}">${value}</span>`;
  }

  protected toPipe(col: TableComponentCol, item) {
    let {value, slug} = this.getSlugAndValue(col, item);
    if (typeof col.pipe !== 'string') {
      if (Array.isArray(value)) {
        value = col.pipe.transform(value[0], ...value.splice(1));
      } else {
        value = col.pipe.transform(value);
      }
    }
    return `<span class="table-field-${col.type || 'default'}-${slug}">${value}</span>`;
  }

  toCurrency(col: TableComponentCol, item) {
    const {value, slug} = this.getSlugAndValue(col, item);
    const v = new CurrencyPipe('PT-BR').transform(value || 0, 'R$');
    return `<span class="table-field-${col.type || 'default'}-${slug}">${v}</span>`;
  }


  getFieldValue(col: TableComponentCol, item) {
    try {

      if (col.pipe) {
        return this.toPipe(col, item);
      }

      switch (col.type) {
        case 'img':
        case 'image':
          return this.toImage(col, item);
        case 'imagebg':
        case 'background':
          return this.toImage(col, item, true);
        case 'currency':
          return this.toCurrency(col, item);
        case 'ng-pipe':
          return this.toPipe(col, item);
        default:
          return this.toSimple(col, item);

      }
    } catch (e) {
      console.error(e, {col, item});
      return '';
    }
  }

  getFieldClass(col: TableComponentCol) {
    return [`col-field-${kebabCase(col.field)}`];
  }

  trackCol(index, item: TableComponentCol) {
    return item ? item.field : null;
  }

  ngOnInit() {


  }

  ngAfterViewInit() {


  }
}
