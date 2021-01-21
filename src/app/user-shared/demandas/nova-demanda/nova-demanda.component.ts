import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '@app/services/app.service';
import {UserRole} from '@app/commons';
import {AuthService} from '@app/services';

@Component({
  selector: 'app-nova-demanda',
  templateUrl: './nova-demanda.component.html',
  styleUrls: ['./nova-demanda.component.scss']
})

export class NovaDemandaComponent implements OnInit {

  form: FormGroup;
  statuscad: any;

  constructor(protected app: AppService, private fb: FormBuilder, public activeModal: NgbActiveModal, protected auth: AuthService) {
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
        this.app.router.navigate(['/', this.auth.user.role === UserRole.Administrador ? 'admin' : 'gestor', 'demandas', demanda.id]).then();
      } catch (error) {
        console.error(error);

      }
    }
  }

}
