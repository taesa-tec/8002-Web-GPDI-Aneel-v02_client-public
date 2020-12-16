import {AppService} from '@app/services/app.service';
import {FormGroup, FormControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {UsersService} from '@app/services/users.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {
  pessoas: Array<any> = [];
  formEquipe: FormGroup;
  equipeOutros = new FormArray([]);

  constructor(protected app: AppService, protected usersService: UsersService, private fb: FormBuilder) {
  }

  async ngOnInit() {
    await this.app.loading.show();
    await this.configForm();
    this.app.loading.hide();
  }


  async configForm() {
    const [equipe, pessoas] = await Promise.all([this.app.sistema.getEquipePeD(), this.usersService.all().toPromise()]);
    this.formEquipe = this.fb.group({
      diretor: ['', Validators.required],
      gerente: ['', Validators.required],
      coordenador: ['', Validators.required],
      outros: this.equipeOutros
    });


    this.pessoas = pessoas.filter(({nomeCompleto}) => nomeCompleto !== null);

    if (equipe.outros) {
      equipe.outros.forEach(pessoa => this.add(pessoa.id));
    } else {
      this.add();
    }
    this.formEquipe.patchValue({
      diretor: equipe.diretor && equipe.diretor.id || '',
      gerente: equipe.gerente && equipe.gerente.id || '',
      coordenador: equipe.coordenador && equipe.coordenador.id || ''
    });
  }

  pessoasEquipe(current?: string) {
    const value = this.formEquipe.value;
    const selecteds = [value.diretor, value.gerente, value.coordenador, ...value.outros];
    return this.pessoas.filter(p => selecteds.indexOf(p.id) === -1 || p.id === current);
  }


  add(id = '') {
    this.equipeOutros.push(new FormControl(id, [Validators.required]));
  }

  remove(index) {
    this.equipeOutros.removeAt(index);
  }

  async salvar() {
    console.log(this.formEquipe.value);
    if (this.formEquipe.valid) {
      this.app.loading.show();
      try {
        await this.app.sistema.setEquipePeD(this.formEquipe.value);
        this.app.alert('Alterado com sucesso');
      } catch (e) {
        this.app.alert('Não foi possível salvar a equipe');
        console.error(e);
      }
      this.app.loading.hide();
    }
  }

}
