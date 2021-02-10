import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app/services/app.service';

@Component({
  selector: 'app-escopo',
  templateUrl: './escopo.component.html',
  styleUrls: ['./escopo.component.scss']
})
export class EscopoComponent implements OnInit {

  formEscopo: FormGroup;
  arrayMetas = this.fb.array([]);

  numMeses = [
    {id: 1, numMeses: 'Valor 1'},
    {id: 2, numMeses: 'Valor 2'},
    {id: 3, numMeses: 'Valor 3'},
    {id: 4, numMeses: 'Valor 4'},
  ];

  constructor(
    private app: AppService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm() {
    this.formEscopo = this.fb.group({
      id: ['', [Validators.required]],
      objetivo: ['', [Validators.required]],
      metas: this.arrayMetas,
      descTaesa: ['', [Validators.required]],
      descInstituicao: ['', [Validators.required]],
      descIndustria: ['', [Validators.required]],
      descSetorEletrico: ['', [Validators.required]],
      descSociedade: ['', [Validators.required]],
      descEmpresasParceiras: ['', [Validators.required]],
      descContrapartidas: ['', [Validators.required]]
    });

    const escopoProjeto = this._getEscopoProjeto();

    if(escopoProjeto) {
      this.formEscopo.patchValue(escopoProjeto);
      escopoProjeto.metas.map(i => this.addMeta(i));
    } else {
      this.addMeta();
    }
  }

  getNumMeses(numMeses: FormGroup) {
    const id = parseInt(numMeses.value.numMeses);
    const selecteds = this.arrayMetas.controls.map(i => parseInt(i.value.numMeses));

    return this.numMeses.filter(item => selecteds.indexOf(item.id) === -1 || item.id === id);
  }

  addMeta(meta?: any) {
    const formGroup = this.fb.group({
      objetivo: [meta && meta.objetivo || '', Validators.required],
      numMeses: [meta && meta.numMeses || '', Validators.required]
    })

    this.arrayMetas.push(formGroup);
  }

  removeMeta(index) {
    this.arrayMetas.removeAt(index);
  }

  onSubmit() {
    if(this.formEscopo.valid) {
      const data = this.formEscopo.value;
      
      try {
        console.log(data);
        this.app.alert('Escopo salvo com sucesso');

      } catch (e) {
        this.app.alert('Não foi possível salvar o escopo');
        console.error(e);
      }
    }
  }

  _getEscopoProjeto() {
    return {
      id: 1,
      objetivo: 'Objetivo',
      metas: [
        {objetivo: 'Objetivo', numMeses: 1},
        {objetivo: 'Objetivo 1', numMeses: 2}
      ],
      descTaesa: 'Desc Taesa',
      descInstituicao: 'Desc Instituição',
      descIndustria: 'Desc Indústria',
      descSetorEletrico: 'Desc Setor Elétrico',
      descSociedade: 'Desc Sociedade',
      descEmpresasParceiras: 'Desc Empresas Parceiras',
      descContrapartidas: 'Desc Contrapartidas'
    };
  }

}
