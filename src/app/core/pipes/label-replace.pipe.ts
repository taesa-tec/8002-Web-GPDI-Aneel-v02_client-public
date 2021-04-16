import {Inject, Optional, Pipe, PipeTransform} from '@angular/core';
import {COMPONENT_LABELS} from '@app/core/shared';

@Pipe({
  name: 'label'
})
export class LabelReplacePipe implements PipeTransform {

  constructor(@Optional() @Inject(COMPONENT_LABELS) protected labels: Map<string, string>) {
  }

  transform(value: string, ...args: unknown[]): string {
    return this.labels?.has(value) ? this.labels.get(value) : value;
  }

}
