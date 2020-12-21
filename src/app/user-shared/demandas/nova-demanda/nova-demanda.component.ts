import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CriarDemanda} from '../../../dashboard/painel-demandas/conf-padrao/services/criar-demanda.service';
import {AppService} from '@app/services/app.service';

@Component({
  selector: 'app-nova-demanda',
  templateUrl: './nova-demanda.component.html',
  styleUrls: ['./nova-demanda.component.scss']
})

export class NovaDemandaComponent implements OnInit {

  form: FormGroup;
  statuscad: any;

  constructor(protected app: AppService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
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
        this.app.alert('Demanda salva com sucesso!', 'Sucesso');
        this.activeModal.close();
        this.app.router.navigate(['/dashboard', 'demanda', demanda.id]);
      } catch (error) {
        console.error(error);

      }
    }
  }

}
