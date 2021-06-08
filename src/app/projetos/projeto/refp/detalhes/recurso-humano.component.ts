import {Component, Input, OnInit} from '@angular/core';
import {RegistroInfo} from '@app/projetos/projeto/refp/registroInfo';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-recurso-humano',
  templateUrl: './recurso-humano.component.html',
  styles: []
})
export class RecursoHumanoComponent implements OnInit {

  @Input() registro: RegistroInfo;
  @Input() readonly: boolean;

  form = this.fb.group({
    recurso: [''],
    financiador: [''],
    recebedor: [''],
    mesReferencia: [''],
    quantidadeHoras: [''],
    tipoDocumento: [''],
    dataDocumento: [''],
    numeroDocumento: [''],
    custo: [''],
    atividadeRealizada: [''],
  });

  constructor(protected fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.registro) {
      this.form.patchValue(this.registro);
      let mes = this.form.value.mesReferencia;
      mes = mes.split('T')[0];
      let data = this.form.value.dataDocumento;
      data = data.split('T')[0];
      this.form.get('mesReferencia').setValue(mes);
      this.form.get('dataDocumento').setValue(data);
      if (this.readonly) {
        this.form.disable();
      }
    }
  }

}
