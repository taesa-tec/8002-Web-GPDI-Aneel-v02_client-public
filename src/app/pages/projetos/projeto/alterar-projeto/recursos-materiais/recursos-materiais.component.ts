import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TableComponentCols} from '@app/core/components';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ProjetoService} from '@app/pages/projetos/projeto/services/projeto.service';
import {AppService} from '@app/services';

@Component({
  selector: 'app-recursos-materiais',
  templateUrl: './recursos-materiais.component.html',
  styles: []
})
export class RecursosMateriaisComponent implements OnInit {

  tableCols: TableComponentCols = [
    {
      field: 'nome',
      title: 'Nome Recurso',
      order: true,
    },
    {
      field: 'categoriaContabil',
      title: 'Categoria Contabil',
      order: true,
    },
    {
      field: 'valorUnitario',
      title: 'Valor Unitário',
      type: 'currency',
      order: true,
    }
  ];
  buttons = [
    {
      isLink: true,
      action: './#${id}',
      text: 'EDITAR',
      icon: 'ta-edit',
      className: 'btn btn-primary'
    }
  ];
  recursos = [];
  categorias = [];


  // Criar/Editar

  form = this.fb.group({
    id: 0,
    nome: ['', Validators.required],
    categoriaContabilId: ['', Validators.required],
    valorUnitario: [0, Validators.required],
    especificacaoTecnica: ['', Validators.required]
  });

  protected activeModal: NgbModalRef;

  @ViewChild('formRef') formRef: TemplateRef<any>;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected fb: FormBuilder,
              protected modal: NgbModal,
              protected cdr: ChangeDetectorRef,
              protected service: ProjetoService,
              protected app: AppService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.recursos = data.recursos;
      this.categorias = data.categorias;

      if (data.recurso) {
        this.form.patchValue(data.recurso);
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
        this.openForm().then();
      } else {
        this.form.reset({
          id: 0,
          nome: '',
          categoriaContabilId: '',
          valorUnitario: 0,
          especificacaoTecnica: ''
        });
      }


    });
    this.route.fragment.subscribe(f => {
      if (f === 'novo') {
        setTimeout(() => {
          this.openForm().then();
        }, 100);

      }
    });
  }


  async openForm() {
    this.activeModal = this.modal.open(this.formRef, {size: 'lg'});
    try {
      this.cdr.detectChanges();
      await this.activeModal.result;
    } catch (e) {
      console.error(e);
    }
    this.router.navigate(['./'], {relativeTo: this.route}).then();
  }

  async remover(id) {
    if (!await this.app.confirm('Tem certeza que deseja remover esse registro?')) {
      return;
    }
    const projeto = this.service.getCurrentProjeto();
    this.app.loading.show().then();
    try {
      await this.service.delete(`${projeto.id}/Recursos/Materiais/${id}`);
      this.activeModal.close();
    } catch (e) {
      console.log(e);
      if (e.error && e.error.detail) {
        this.app.alertError(e.error.detail).then();
      } else {
        this.app.alertError('Não foi possível excluir o recurso!').then();
      }
    }
    this.app.loading.hide();

  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.app.loading.show().then();
    const projeto = this.service.getCurrentProjeto();
    const url = `${projeto.id}/Recursos/Materiais`;

    try {

      if (this.form.value.id === 0) {
        await this.service.post(url, this.form.value);
      } else {
        await this.service.put(url, this.form.value);
      }
      this.app.alert('Salvo com sucesso!').then();
      this.activeModal.close();
    } catch (e) {
      console.error(e);
      this.app.alertError('Não foi possível salvar o recurso, tente novamente mas tarde').then();
    }
    this.app.loading.hide();
  }

}
