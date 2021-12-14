import {Inject, Optional, Pipe, PipeTransform} from '@angular/core';
import {COMPONENT_LABELS} from '@app/core/shared';

@Pipe({
  name: 'label'
})
export class LabelReplacePipe implements PipeTransform {

  labels: Map<string, string>[];

  constructor(@Optional() @Inject(COMPONENT_LABELS) labels: Map<string, string>[]) {
    this.labels = [...labels].reverse();
  }

  transform(value: string, ...args: unknown[]): string {
    return (this.labels?.find(l => l.has(value))?.get(value)) || value;
  }

}
