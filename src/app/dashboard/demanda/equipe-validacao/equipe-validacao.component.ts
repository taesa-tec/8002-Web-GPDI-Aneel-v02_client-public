import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-definicao-pessoas-processo-validacao',
  templateUrl: './equipe-validacao.component.html',
  styleUrls: []
})
export class EquipeValidacaoComponent implements OnInit {

  form: FormGroup;
  pessoas: Array<any> = [];
  equipe: any;
  demandaId: number;


  constructor(protected app: AppService, protected route: ActivatedRoute) {
  }

  ngOnInit() {
    this.demandaId = parseFloat(this.route.snapshot.parent.paramMap.get('id'));
    this.configForm();
  }

  async configForm() {
    let superiorDireto;

    [this.equipe, this.pessoas, {superiorDireto}] = await Promise.all([
      this.app.sistema.getEquipePeD(),
      this.app.users.all().toPromise(),
      this.app.demandas.getSuperiorDireto(this.demandaId)]);

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
        await this.app.demandas.setSuperiorDireto(this.demandaId, this.form.value);
        this.app.alert('Demanda atualizada com sucesso!');
      } catch (e) {
        this.app.alert('Não foi possível atualizar a demanda');
      }
      this.app.hideLoading();
    }
  }

}
