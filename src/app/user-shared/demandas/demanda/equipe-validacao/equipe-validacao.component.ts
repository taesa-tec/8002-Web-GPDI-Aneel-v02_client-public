import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '@app/services/users.service';
import {UserRole} from '@app/commons';
import {DEMANDA} from '@app/user-shared/demandas/demanda/providers';
import {Demanda} from '@app/commons/demandas';

@Component({
  selector: 'app-definicao-pessoas-processo-validacao',
  templateUrl: './equipe-validacao.component.html',
  styleUrls: []
})
export class EquipeValidacaoComponent implements OnInit {

  form: FormGroup;
  pessoas: Array<any> = [];
  equipe: any;

  constructor(
    @Inject(DEMANDA) protected demanda: Demanda,
    protected app: AppService,
    protected usersService: UsersService,
    protected route: ActivatedRoute) {
  }

  ngOnInit() {
    this.configForm().then();
  }

  async configForm() {
    let superiorDireto;

    [this.equipe, this.pessoas, {superiorDireto}] = await Promise.all([
      this.app.sistema.getEquipePeD(),
      this.usersService.usersInRole(UserRole.User),
      this.app.demandas.getSuperiorDireto(this.demanda.id)]);

    this.form = new FormGroup({
      superiorDireto: new FormControl(superiorDireto || '', [Validators.required]),
    });
  }

  getMembroEquipe(id: string) {
    return this.pessoas.find(p => p.id === id);
  }

  getMembroNome(id: string) {
    const membro = this.getMembroEquipe(id);
    if (membro) {
      return membro.nomeCompleto || membro.userName;
    }
    return 'Não encontrado';
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
