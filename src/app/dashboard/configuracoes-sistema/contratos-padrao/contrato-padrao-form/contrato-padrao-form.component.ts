import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '@app/services/app.service';
import _configEditor from './config-editor';

@Component({
  selector: 'app-contrato-padrao-form',
  templateUrl: './contrato-padrao-form.component.html',
  styleUrls: ['./contrato-padrao-form.component.scss']
})
export class ContratoPadraoFormComponent implements OnInit {

  formContrato: FormGroup;
  categorias: Array<string>;
  configEditor = _configEditor;

  constructor(
    protected app: AppService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit() {
    this.categorias = ["Executor", "Co-Executor"];
    this.configForm();
  }

  async configForm() {
    const idContrato = this.route.snapshot.params['id'];
    const contrato: any = idContrato && await this.getContrato(idContrato);
    
    this.formContrato = this.fb.group({
      id: [contrato && contrato.id || ''],
      titulo: [contrato && contrato.titulo || '', [Validators.required]],
      categoria: [contrato && contrato.categoria || '', [Validators.required]],
      texto: [contrato && contrato.texto || '', Validators.required]
    });
  }

  async onSubmit() {
    if (this.formContrato.valid) {
      const contrato: any = this.formContrato.value;

      try {
        if (contrato.id) {
          //await this.app.fornecedores.editarContrato(contrato);
          this.app.alert('Contrato editado com sucesso');
        } else {
          //await this.app.fornecedores.criarContrato(contrato);
          this.app.alert('Contrato cadastrado com sucesso');
        }
        this.location.back();

      } catch (e) {
        this.app.alert('Não foi possível salvar o contrato');
        console.error(e);
      }
    }
  }

  getContrato(id) {
    return [
      {
        "id": "1",
        "titulo": "Contrato 1",
        "categoria": "Fornecedor",
        "texto": "<p>Lorem Ipsum 1 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>\n"
      },
      {
        "id": "2",
        "titulo": "Contrato 2",
        "categoria": "Executor",
        "texto": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>"
      },
      {
        "id": "3",
        "titulo": "Contrato 3",
        "categoria": "Executor",
        "texto": "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>"
      },
      {
        "id": "4",
        "titulo": "Contrato 4",
        "categoria": "Executor",
        "texto": "<p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from</p>"
      },
      {
        "id": "5",
        "titulo": "Contrato 5",
        "categoria": "Fornecedor",
        "texto": "<p class='text-danger'>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with</p>\n"
      }
    ].find(item => item.id == id);
  }

}
