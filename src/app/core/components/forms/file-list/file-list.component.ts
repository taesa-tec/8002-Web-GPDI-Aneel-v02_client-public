import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileListComponent),
      multi: true
    }
  ],
})
export class FileListComponent implements OnInit, ControlValueAccessor {
  @Input() name = '';
  @Input() disabled;
  @Input('value') val: FileList;
  @Input() maxsize = 100 * 1024 * 1024; // 100mb
  @Output() error = new EventEmitter<any>();

  fileinfo: Array<{ name: string, size: number }> = [];

  get value() {
    return this.val;
  }

  set value(val) {

    if (!this.checkFiles(val)) {
      return;
    }

    this.val = val;
    this.onChange(val);
    this.onTouched();
    this.updateFileInfo();
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  writeValue(value: FileList) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean) {
    this.disabled = state;
  }

  elOnChange(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.files);
    this.writeValue(input.files);
  }

  protected checkFiles(fileList: FileList) {
    let size = 0;
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList.item(i);
      size += f.size;
    }
    if (size > this.maxsize) {
      const ms = this.maxsize / 1024;
      this.error.emit(`Total do upload é grande demais para ser enviado, o upload máximo é de ${ms}`);
      return false;
    }
    return true;
  }

  protected updateFileInfo() {
    this.fileinfo = [];
    for (let i = 0; i < this.value.length; i++) {
      const file = this.value.item(i);
      this.fileinfo.push({name: file.name, size: file.size});
    }
  }

}
