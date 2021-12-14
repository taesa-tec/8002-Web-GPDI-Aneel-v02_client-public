import {Component, EventEmitter, Inject, InjectionToken, Input, OnInit, Optional, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  TABLE_ACTIONS,
  TABLE_COLS,
  TABLE_DATA_REQUEST,
  TableComponentActions,
  TableComponentCols,
  TableDataRequester
} from '@app/core/components/table';

export const CRUD_EDITOR = new InjectionToken<any>('Crud Editor');

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  @Input() newItemLabel = 'Novo';
  @Input() showNewItemButton = true;
  data: Array<any> = [];

  @Output() editorOpen: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    protected route: ActivatedRoute,
    private modal: NgbModal,
    @Optional() @Inject(TABLE_COLS) public cols: TableComponentCols = [],
    @Optional() @Inject(TABLE_ACTIONS) public buttons: TableComponentActions = [],
    @Optional() @Inject(TABLE_DATA_REQUEST) public request: TableDataRequester,
    @Optional() @Inject(CRUD_EDITOR) public editor: any,
  ) {
    this.cols = this.cols || [];
    this.buttons = this.buttons || [];
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (!this.request && data.data) {
        this.data = data.data;
      }
    });
    this.route.fragment.subscribe(f => {
      if (f === 'novo' || !isNaN(parseFloat(f))) {
        this._openModal();
      }
    });
  }

  private _openModal() {
    if (this.editor) {
      const ref = this.modal.open(this.editor, {size: 'lg'});
      this.editorOpen.emit(ref);
    } else {
      console.error('Editor não definido');
    }
  }

}
