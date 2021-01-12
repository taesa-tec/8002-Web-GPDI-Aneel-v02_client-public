import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppService } from '@app/services/app.service';

@Component({
  selector: 'app-plano-trabalho',
  templateUrl: './plano-trabalho.component.html',
  styleUrls: ['./plano-trabalho.component.scss']
})
export class PlanoTrabalhoComponent implements OnInit {

  formPlanoTrabalho: FormGroup;

  constructor(
    private app: AppService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  configForm() {
    this.formPlanoTrabalho = this.fb.group({
      id: ['', [Validators.required]],
      motivacao: ['', [Validators.required]],
      originalidade: ['', [Validators.required]],
      aplicabilidade: ['', [Validators.required]],
      relevancia: ['', [Validators.required]],
      razoabilidadeCustos: ['', [Validators.required]],
      pesquisasCorrelatas: ['', [Validators.required]],
      metodologiaTrabalho: ['', [Validators.required]],
      buscaAnterioridade: ['', [Validators.required]],
      bibliografia: ['', [Validators.required]]
    });

    const planoTrabalho = this._getPlanoTrabalho();
    
    if(planoTrabalho) {
      this.formPlanoTrabalho.patchValue(planoTrabalho);
    }
  }

  changeFile(e) {
    //this.uploads.push(e.target.files.item(0));
  }

  onSubmit() {
    if(this.formPlanoTrabalho.valid) {
      const data = this.formPlanoTrabalho.value;
      
      try {
        console.log(data);
        this.app.alert('Plano de trabalho salvo com sucesso');

      } catch (e) {
        this.app.alert('Não foi possível salvar o plano de trabalho');
        console.error(e);
      }
    }
  }

  _getPlanoTrabalho() {
    return {
      id: 1,
      motivacao: '',
      originalidade: '',
      aplicabilidade: '',
      relevancia: '',
      razoabilidadeCustos: '',
      pesquisasCorrelatas: '',
      metodologiaTrabalho: '',
      buscaAnterioridade: '',
      bibliografia: '',
      arquivos: ''
    };
  }

}
