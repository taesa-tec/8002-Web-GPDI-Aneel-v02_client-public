import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  TableActionEvent,
  TableComponentActions,
  TableComponentCols,
  TableComponentRow,
  TableComponentOptions,
  TableComponentFilter,
  TableComponentCol, TableCellData, TableOrder, TableComponentAction, TableDataRequester
} from './table';
import {chunk, get, isNil, orderBy, kebabCase, camelCase, template, uniqBy} from 'lodash-es';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {CurrencyPipe} from '@angular/common';
import * as moment from 'moment';
import {Searchables} from '@app/core/util';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  protected $listOrder: Array<TableOrder> = [];
  protected $defaultListOrder: Array<TableOrder> = [];
  protected $data: Array<TableComponentRow> = [];
  protected $inputData: Array<any> = [];
  protected $cols: TableComponentCols;
  protected $index: Searchables<TableComponentRow> = new Searchables<TableComponentRow>();

  requesting = false;
  // Botões
  $buttons: TableComponentActions = [];
  $groupsButtons: TableComponentActions = [];
  actionGroup = '';
  currentData: Array<TableComponentRow> = [];
  showSelect = false;


  @Input() dataRequester: TableDataRequester<any>;
  @Input() emptyText = 'Lista Vazia';
  @Input() showHeader = true;
  @Input() itemIdentity = 'id';
  @Input() hasSelect = false;
  @Input() filters: Array<TableComponentFilter> = [];
  @Input() hasSearch = true;
  @Input() searchTerm = '';

  get cols() {
    return this.$cols;
  }

  @Input() set cols(value: TableComponentCols) {
    this.$cols = value;
    this.$defaultListOrder = this.cols.filter(c => c.order).map(c => ({
      field: c.field,
      direction: 'asc',
      type: c.orderType || 'alpha'
    }));
    this.$defaultListOrder.reverse();
    if (this.$inputData.length > 0) {
      this.data = this.$inputData;
    }
  }

  get listOrder(): Array<TableOrder> {
    return this.$listOrder.length > 0 ? this.$listOrder : this.$defaultListOrder;
  }

  @Input() set listOrder(list) {
    if (Array.isArray(list)) {
      this.$listOrder = list;
    } else {
      this.$listOrder = [list];
    }
  }


  @Input() set options(value: TableComponentOptions) {
    this.buttons = value.buttons || this.buttons;
    this.cols = value.columns || this.cols;
    this.filters = value.filter || this.filters;
    this.hasSelect = value.hasSelect !== undefined ? value.hasSelect : this.hasSelect;
  }

  @Input() pagination: false | { page: number; perPage: number; totalItems: number } = false;

  @Input() set buttons(value: TableComponentActions) {
    if (value) {
      this.$buttons = value.filter(b => !b.isGroupAction);
      this.$groupsButtons = value.filter(b => b.isGroupAction);
    }
  }

  get selection() {
    return this.currentData.filter(item => item.selected).map(item => item.data);
  }

  get allSelected() {
    return this.currentData.length > 0 && this.selection.length === this.currentData.length;
  }

  get colLength() {
    return this.cols.length + (this.$buttons.length > 0 ? 1 : 0) + (this.hasSelect ? 1 : 0);
  }

  // Data
  @Input() set data(value: Array<any>) {
    if (value && Array.isArray(value)) {
      this.$inputData = value;
      this.$data = this.buildData(value.map(data => new TableComponentRow(data)));
      this.$index = new Searchables<TableComponentRow>();
      this.$data.forEach(item => {
        this.$index.push({
          item,
          texts: item.valueToArray().map(i => i.toString())
        });
      });
      if (this.$cols && this.$cols.length > 0) {
        this.setCurrentData().then();
      }
    }
  }

  get data() {
    return this.$data;
  }

  @Output() action: EventEmitter<TableActionEvent> = new EventEmitter<TableActionEvent>();

  constructor(protected sanitizer: DomSanitizer) {
  }

  orderFromCols() {
    this.listOrder = uniqBy([
      ...this.$listOrder.filter(lo => this.$cols.findIndex(c => c.field === lo.field) >= 0),
      ...this.$cols.filter(c => c.order).map(c =>
        ({field: c.field, direction: 'asc'} as TableOrder)
      )], i => i.field).reverse();
  }

  buildData($data: Array<TableComponentRow>) {
    return $data.map($row => {
      const row = Object.assign({}, $row);
      row.rendered = {};
      if (this.cols) {
        this.cols.forEach(col => {
          const cellData = this.getTableCellData(col, row.data);
          row.originalValue[col.field] = cellData.originalValue;
          row.rendered[col.field] = this.renderCell(cellData);
          row.value[camelCase(col.field)] = cellData.value;
        });
      }
      return row;
    });
  }

  filterRows($data: Array<TableComponentRow>) {
    let filteredData = $data;
    this.filters.forEach(f => {
      if (typeof f.filter === 'function') {
        filteredData = filteredData.filter(item => f.filter(item, f.value));
      } else if (f.value || f.value !== '') {

        filteredData = filteredData.filter(item => get(item, `value.${f.field}`) === f.value);
      }
    });
    return filteredData;
  }

  orderRows($data: Array<TableComponentRow>) {
    this.listOrder.forEach(listOrder => {
      let interator: any;
      switch (listOrder.type) {
        case 'date':
          interator = [(item) => moment(get(item, `originalValue.${camelCase(listOrder.field)}`)).unix()];
          break;
        case 'number':
          interator = (item) => {
            const value = parseFloat(get(item, `value.${camelCase(listOrder.field)}`));
            return isNaN(value) ? 0 : value;
          };
          break;
        case 'alpha':
        default:
          interator = (item) => get(item, `value.${camelCase(listOrder.field)}`)?.toString().toLowerCase();
          break;
      }
      $data = orderBy($data, interator, listOrder.direction);
    });
    return $data;
  }

  paginate($data: Array<TableComponentRow>) {
    if (this.pagination) {
      try {
        this.pagination.totalItems = $data.length;
        return chunk($data, this.pagination.perPage)[this.pagination.page - 1] || [];
      } catch (e) {
        return [];
      }
    }
    return $data;
  }

  reorderItems(order: TableOrder) {
    this.removeOrder(order.field);
    this.$listOrder = [...this.$listOrder, order];


    if (this.pagination) {
      this.pagination.page = 1;
    }
    this.setCurrentData().then();
  }

  orderPriority() {
    this.$listOrder = this.$listOrder.sort((a, b) => {
      const colA = this.cols.find(col => col.field === a.field);
      const colB = this.cols.find(col => col.field === b.field);
      const PA = colA.priority || 0;
      const PB = colB.priority || 0;
      if (colA.priority !== colB.priority) {
        return PA > PB ? 1 : -1;
      }
      return 0;
    });
  }

  removeOrder(field) {
    const idx = this.$listOrder.findIndex(item => item.field === field);

    if (idx > -1) {
      this.$listOrder.splice(idx, 1);
    }
  }

  createMenuContext(col: TableComponentCol) {
    if (!col.order) {
      return [];
    }
    let menus: Array<{ action?: CallableFunction; label: string }> = [];
    col.priority = col.priority || 0;
    menus.push({
      label: 'Aumentar Prioridade',
      action: () => {
        col.priority++;
        this.setCurrentData().then();
      }
    });
    menus.push({
      label: 'Diminuir Prioridade',
      action: () => {
        col.priority--;
        this.setCurrentData().then();
      }
    });
    menus = [{label: `${col.title} (${col.priority})`}, ...menus];

    return menus;
  }

  async setCurrentData(page?: number) {
    if (page && this.pagination) {
      this.pagination.page = page;
    }
    if (this.dataRequester) {
      try {
        this.requesting = true;
        this.currentData = [];

        const response = await this.dataRequester(this.pagination ? this.pagination.page : 1,
          this.filters, this.$listOrder, this.searchTerm);

        this.currentData = this.buildData(response.data.map(r => new TableComponentRow(r)));
        this.filters = response.filters.map(filter => {
          const keys = Object.keys(filter.values);
          return {
            class: 'col-auto',
            field: filter.field,
            value: '',
            options: [
              {value: '', text: ` Selecionar ${filter.name}`},
              ...keys.map(k => ({text: filter.values[k], value: k}))
            ]
          };
        });
        this.pagination = this.pagination ? {
          page: response.page,
          perPage: response.perPage,
          totalItems: response.totalItems
        } : false;
      } catch (e) {

      } finally {
        this.requesting = false;
      }

    } else {
      this.orderPriority();
      this.currentData = this.paginate(this.orderRows(this.filterRows(this.$index.search(this.searchTerm))));
    }
    this.showSelect = this.hasSelect && this.$groupsButtons.length > 0;
  }

  trackFunc(index, item) {
    if (this.itemIdentity && get(item.data, this.itemIdentity)) {
      return get(item.data, this.itemIdentity);
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
      console.error(e);
    }

  }

  toggleGroupSelect() {
    const allSelected = this.allSelected;
    const count = this.selection.length;
    this.data.forEach(item => {
      item.selected = allSelected ? false : count === 0;
    });
  }

  getActionLink(action: TableComponentAction, item: TableComponentRow) {
    try {
      return template(action.action)(item.data).split('#')[0];
    } catch (e) {
      return '';
    }
  }

  getActionLinkFragment(action: TableComponentAction, item: TableComponentRow) {
    try {
      const link = template(action.action)(item.data).split('#', 2);
      return link.length > 1 ? link[1] : null;
    } catch (e) {
      return null;
    }
  }

  doAction(action: string, data: any) {
    this.action.emit({action, data});
  }

  doActionGroup(action: string, data: any) {
    this.actionGroup = '';
    this.doAction(action, data);
  }

  protected getTableCellData(col: TableComponentCol, item): TableCellData {
    let value: string;
    const originalValue = get(item, col.field);
    const slug = kebabCase(col.field);
    if (typeof col.value === 'function') {
      value = col.value(item);
    } else {
      value = isNil(originalValue) ? '' : originalValue;
    }
    return {
      slug,
      value,
      originalValue,
      col
    };
  }

  protected toImage(cellData: TableCellData, asBackground = false) {
    const {value, slug} = cellData;
    if (asBackground) {
      return this.sanitizer.bypassSecurityTrustHtml(`<div style="background-image:url(${value})" class="table-field-imagebg-${slug}" />`);
    }
    return `<img src="${value}" alt="Imagem" class="table-field-image-${slug}" />`;
  }

  protected toSimple(cellData: TableCellData) {
    const {value, slug, col} = cellData;

    return `<span class="table-field-${col.type || 'default'}-${slug}">${value}</span>`;
  }

  protected toPipe(cellData: TableCellData) {
    const {slug, col} = cellData;
    let value = cellData.value;
    if (typeof col.pipe !== 'string') {
      if (Array.isArray(value)) {
        value = col.pipe.transform(value[0], ...value.splice(1));
      } else {
        value = col.pipe.transform(value);
      }
    }
    return `<span class="table-field-${col.type || 'default'}-${slug}">${value}</span>`;
  }

  toCurrency(cellData: TableCellData) {
    const {value, slug, col} = cellData;
    const v = new CurrencyPipe('PT-BR').transform(value || 0, 'R$');
    return `<span class="table-field-${col.type || 'default'}-${slug}">${v}</span>`;
  }

  renderCell(cellData: TableCellData): string | SafeHtml {
    try {
      if (cellData.col.pipe) {
        return this.toPipe(cellData);
      }

      switch (cellData.col.type) {
        case 'img':
        case 'image':
          return this.toImage(cellData);
        case 'imagebg':
        case 'background':
          return this.toImage(cellData, true);
        case 'currency':
          return this.toCurrency(cellData);
        case 'ng-pipe':
          return this.toPipe(cellData);
        case 'template':
          const text = typeof cellData.col.template === 'function' ? cellData.col.template(cellData.value) : cellData.col.template;
          return template(text)(typeof cellData.value === 'object' ? cellData.value : cellData);
        default:
          return this.toSimple(cellData);

      }
    } catch (e) {
      console.error(e, {cell: cellData});
      return '';
    }
  }

  getFieldClass(col: TableComponentCol) {
    return [`col-field-${kebabCase(col.field)}`];
  }

  trackCol(item: TableComponentCol) {
    return item ? item.field : null;
  }

  ngOnInit() {
    if (this.data.length === 0 && this.dataRequester) {
      this.setCurrentData().then();
    }
  }
}
