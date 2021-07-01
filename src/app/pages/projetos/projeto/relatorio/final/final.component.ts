import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Projeto } from '../../projeto.component';
import { ProjetoService } from '@app/pages/projetos/projeto/services/projeto.service';
import { RelatorioFinal } from './../relatorio';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html'
})
export class FinalComponent implements OnInit {

  projeto: Projeto;
  relatorio: RelatorioFinal;
  relatorioArquivo: File;
  auditoriaRelatorioArquivo: File;

  form = this.fb.group({
    id: [0, Validators.required],
    isProdutoAlcancado: ['', Validators.required],
    tecnicaProduto: ['', Validators.required],
    isTecnicaImplementada: ['', Validators.required],
    tecnicaImplementada: ['', Validators.required],
    isAplicabilidadeAlcancada: ['', Validators.required],
    aplicabilidadeJustificativa: ['', Validators.required],
    resultadosTestes: ['', Validators.required],
    abrangenciaProduto: ['', Validators.required],
    ambitoAplicacaoProduto: ['', Validators.required],
    transferenciaTecnologica: ['', Validators.required]
  });

  constructor(
    private service: ProjetoService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const {relatorio} = this.route.snapshot.data;
    this.relatorio = relatorio;
    this.projeto = this.service.getCurrentProjeto();

    if(this.relatorio.id) {
      this.form.patchValue(this.relatorio);
    }

    this.changeProdutoAlcancado();
    this.changeTecnicaImplementada();
    this.changeAplicabilidadeAlcancada();
  }

  changeProdutoAlcancado() {
    this.form.get('isProdutoAlcancado').valueChanges.subscribe(status => {
      this.form.controls['tecnicaProduto'].reset();
    });
  }

  changeTecnicaImplementada() {
    this.form.get('isTecnicaImplementada').valueChanges.subscribe(status => {
      this.form.controls['tecnicaImplementada'].reset();
    });
  }

  changeAplicabilidadeAlcancada() {
    this.form.get('isAplicabilidadeAlcancada').valueChanges.subscribe(status => {
      const controls = [
        {name: 'resultadosTestes', status: true},
        {name: 'abrangenciaProduto', status: true},
        {name: 'ambitoAplicacaoProduto', status: true},
        {name: 'aplicabilidadeJustificativa', status: false}
      ];

      controls.forEach(c => {
        if(status) {
          this.form.controls[c.name].setValidators([c.status ? Validators.required : Validators.nullValidator]);
        } else {
          this.form.controls[c.name].setValidators([!c.status ? Validators.required : Validators.nullValidator]);
        }
      });
      
      controls.forEach(c => {
        this.form.controls[c.name].reset();
        this.form.controls[c.name].updateValueAndValidity();
      });
    });
  }

  fileChange(file: string, evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    this[file] = files.length > 0 ? files.item(0) : null;
  }

  validate() {
    return (this.form.valid && this.relatorioArquivo && this.auditoriaRelatorioArquivo);
  }

  async submit() {
    try {
      if(this.validate()) {
        const relatorio = this.form.value;
        const path = `${this.projeto.id}/Relatorio/RelatorioFinal`;

        if(relatorio.id) {
          this.relatorio = await this.service.put(path, relatorio);
        } else {
          this.relatorio = await this.service.post(path, relatorio);
        }
        this.form.patchValue(this.relatorio);
      }
    } catch(e) {
      console.log(e.message);
    }
  }

}
