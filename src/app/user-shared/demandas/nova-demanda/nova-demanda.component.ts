import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {CURRENT_USER, Roles, User, UserRole} from '@app/commons';

@Component({
  selector: 'app-nova-demanda',
  templateUrl: './nova-demanda.component.html',
  styleUrls: ['./nova-demanda.component.scss']
})

export class NovaDemandaComponent implements OnInit {

  form: FormGroup;
  statuscad: any;

  constructor(protected app: AppService, private fb: FormBuilder, public activeModal: NgbActiveModal,
              @Inject(CURRENT_USER) protected user: User) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        const demanda = await this.app.demandas.criarDemanda(this.form.value.titulo);
        this.app.alert('Demanda salva com sucesso!', 'Sucesso').then();
        this.activeModal.close();
        this.app.router.navigate(['/', this.user.role === UserRole.Administrador ? 'admin' : 'gestor', 'demandas', demanda.id]).then();
      } catch (error) {
        console.error(error);

      }
    }
  }

}
