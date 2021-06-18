import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '@app/services/users.service';
import {EQUIPE_PED, EquipePeD, UserRole} from '@app/commons';
import {DEMANDA} from '@app/pages/demandas/demanda/providers';
import {Demanda} from '@app/commons/demandas';
import {AuthService} from '@app/services';

@Component({
  selector: 'app-definicao-pessoas-processo-validacao',
  templateUrl: './equipe-validacao.component.html',
  styleUrls: []
})
export class EquipeValidacaoComponent implements OnInit {

  form: FormGroup;
  pessoas: Array<any> = [];

  constructor(
    @Inject(DEMANDA) protected demanda: Demanda,
    @Inject(EQUIPE_PED) public equipe: EquipePeD,
    protected app: AppService,
    protected usersService: UsersService,
    public auth: AuthService,
    protected route: ActivatedRoute) {
  }

  ngOnInit() {
    this.configForm().then();
  }

  async configForm() {
    let superiorDireto;

    [this.pessoas, {superiorDireto}] = await Promise.all([
      this.usersService.usersInRole(UserRole.User),
      this.app.demandas.getSuperiorDireto(this.demanda.id)]);

    this.form = new FormGroup({
      superiorDireto: new FormControl(superiorDireto || '', [Validators.required]),
    });
  }

  async salvar() {
    if (this.form.valid) {
      this.app.showLoading();
      try {
        await this.app.demandas.setSuperiorDireto(this.demanda.id, this.form.value);
        this.app.hideLoading();
        await this.app.alert('Demanda atualizada com sucesso!');
        this.app.router.navigate(['/dashboard', 'demanda', this.demanda.id, 'formulario', 'especificacao-tecnica']);
      } catch (e) {
        this.app.hideLoading();
        this.app.alert('Não foi possível atualizar a demanda');
      }

    }
  }

}
