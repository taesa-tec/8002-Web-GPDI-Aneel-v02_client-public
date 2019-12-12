import {Component, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    }
  ],
})
export class UploadFileComponent implements OnInit, ControlValueAccessor {
  @Input() name = '';
  @Input() disabled;
  @Input('value') val: FileList;

  fileinfo: Array<{ name: string, size: number }> = [];

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
    this.updateFileInfo();
  }

  constructor() {
  }

  protected updateFileInfo() {
    this.fileinfo = [];
    for (let i = 0; i < this.value.length; i++) {
      const file = this.value.item(i);
      this.fileinfo.push({name: file.name, size: file.size});
    }
  }

  ngOnInit() {
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
    this.writeValue(input.files);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.writeValue(event.dataTransfer.files);
  }

  onDragover(event: DragEvent) {
    event.preventDefault();
  }

  onDrag(event: DragEvent) {
    event.preventDefault();
  }
}
