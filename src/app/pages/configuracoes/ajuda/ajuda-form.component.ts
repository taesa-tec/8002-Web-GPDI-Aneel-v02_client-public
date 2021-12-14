import {Component, Inject, OnInit} from '@angular/core';
import {AppService, ServiceBase} from '@app/services';
import {FormBuilder, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {ConfigEditor} from '@app/core/shared';
import * as ClassicEditor from '@projects/ckeditor/build/ckeditor';
import {KONAMI_CODE} from '@app/commons';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-ajuda-form',
  templateUrl: './ajuda-form.component.html',
  styles: []
})
export class AjudaFormComponent implements OnInit {
  isCheating = false;
  configEditor = ConfigEditor;
  editor = ClassicEditor;
  route: ActivatedRoute;
  form = this.fb.group({
    id: 0,
    codigo: ['', Validators.required],
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
    conteudo: [''],
  });

  constructor(private app: AppService, private fb: FormBuilder, public activeModal: NgbActiveModal,
              protected service: ServiceBase<any>,
              @Inject(KONAMI_CODE) protected kc: BehaviorSubject<boolean>) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.data.item) {
      this.form.patchValue(this.route.snapshot.data.item);
    }
    this.kc.subscribe(ischeating => {
      this.isCheating = ischeating;
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        await this.service.salvar(this.form.value);
        this.app.alert('Salvo com sucesso!').then();
        this.activeModal.close();

      } catch (e) {
        this.app.alert('Não foi possível salvar').then();
        console.error(e);
      }
    }
  }


  async remover() {
    if (this.form.value.id !== 0 && await this.app.confirm('Tem certeza que deseja remover?',
      'Confirme a exclusão?')) {
      await this.service.excluir(this.form.value.id);
      this.activeModal.close(true);
    }
  }

}
