import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

import {AppService} from '@app/services/app.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ServiceBase} from '@app/services/service-base.service';
import {FornecedoresService} from '@app/services/fornecedores.service';
import {ContratosService} from '@app/services/contratos.service';
import {LoadingComponent} from '@app/core/components';
import {UsersService} from '@app/services';
import {UserRole} from '@app/commons';

@Component({
  selector: 'app-criar-captacao',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.scss']
})
export class CriarComponent implements OnInit {

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  projeto: any;
  fornecedores: Array<{ id: number; nome: string }> = [];
  contratos: Array<{ id: number; titulo: string }> = [];
  equipe: Array<any> = [];
  fornecedoresFormArray: FormArray = new FormArray([]);
  form: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    usuarioSuprimentoId: [''],
    fornecedores: this.fornecedoresFormArray,
    contratoId: [''],
    observacoes: [''],
    files: ['']
  });


  get id(): number {
    return this.form.get('id').value;
  }

  set id(value: number) {
    this.form.get('id').setValue(value);
  }


  constructor(
    protected app: AppService,
    protected service: ServiceBase<any>,
    protected fornecedorService: FornecedoresService,
    protected contratosService: ContratosService,
    protected usersService: UsersService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  async ngOnInit() {
    const [fornecedores, contratos, equipe] = await Promise.all([this.fornecedorService.obter(), this.contratosService.obter(),
      this.usersService.usersInRole(UserRole.Suprimento)]);
    this.fornecedores = fornecedores; // await this.fornecedorService.obter();
    this.contratos = contratos; // await this.contratosService.obter();
    this.equipe = equipe; // await this.usersService.usersInRole(UserRole.User);
    this.fornecedoresFormArray = this.form.get('fornecedores') as FormArray;
  }

  adicionarFornecedor(id = '') {
    this.fornecedoresFormArray.push(this.fb.control(''));
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loading.show();
      const {files, ...projeto} = this.form.value as { files: Array<File> };
      try {
        await this.service.post('NovaCaptacao', projeto);
        if (files.length > 0) {
          const fd = new FormData();
          files.forEach(file => {
            fd.append('file', file);
          });
          await this.service.upload(files, `${this.id}/Arquivos`).toPromise();
        }

        this.app.alert('Captação criada com sucesso!', 'Sucesso').then();
        this.activeModal.close();
      } catch (error) {
        this.app.alert('Erro na criação da Captação', 'Erro!').then();
        console.error(error);
      } finally {
        this.loading.hide();
      }
    }
  }
}
