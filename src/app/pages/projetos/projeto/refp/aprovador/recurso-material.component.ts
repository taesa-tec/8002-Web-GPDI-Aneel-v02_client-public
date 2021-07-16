import {Component, Input, OnInit} from '@angular/core';
import {RegistroInfo} from '@app/pages/projetos/projeto/refp/registroInfo';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-recurso-material',
  templateUrl: './recurso-material.component.html',
  styles: []
})
export class RecursoMaterialComponent implements OnInit {

  @Input() registro: RegistroInfo;
  @Input() readonly: boolean;

  form = this.fb.group({
    nomeItem: [''],
    recurso: [''],
    beneficiado: [''],
    cnpjBeneficiado: [''],
    categoriaContabil: [''],
    isNacional: [''],
    equipaLaboratorioExistente: [''],
    equipaLaboratorioNovo: [''],
    financiadora: [''],
    recebedora: [''],
    mesReferencia: [''],
    quantidadeHoras: [''],
    tipoDocumento: [''],
    dataDocumento: [''],
    numeroDocumento: [''],
    valor: [''],
    custo: [''],
    especificaoTecnica: [''],
    funcaoEtapa: [''],
  });

  constructor(protected fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.registro) {
      this.form.patchValue(this.registro);
      if (this.readonly) {
        this.form.disable();
      }
    }
  }

}
