import { AppService } from './../../../../core/services/app.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {

  m: Array<any>;
  PessoasEquipe: Array<any> = [];
  i: number = 0;
  adp = 1;
  formEquipe: FormGroup;
  subTemasForms: Array<any>;
  equipeOutros = new FormArray([]);

  constructor(protected app: AppService, private fb: FormBuilder) { }

  ngOnInit() {
    this.m = [
      { text: 'Equipe de P&D', path: 'equipe-ped' },
      { text: 'Padrão Formulários', path: 'padrao-formularios' },
    ];

    this.configForm();
  }


  configForm() {
    this.formEquipe = this.fb.group({
      diretor: ['', Validators.required],
      gerente: ['', Validators.required],
      coordenador: ['', Validators.required],
      equipeOutros: this.equipeOutros
    });



    this.PessoasEquipe = [
      { id: 1, name: 'Jefferson Ferreira' },
      { id: 3, name: 'Filipe Loiola' },
      { id: 4, name: 'Diego França' },
      { id: 5, name: 'João Victor' },
      { id: 6, name: 'Lucas Matheus' },
      { id: 7, name: 'Bruno Galindo' },
      { id: 8, name: 'Ana Luisa' },
      { id: 9, name: 'Kaffael Salvaterra' },
      { id: 10, name: 'Clovis Markan' },
    ];
    this.add();
  }


  add() {
    //(<FormArray>this.formEquipe.get('equipeOutros')).push(new FormControl('', [Validators.required]));
    this.equipeOutros.push(
      new FormGroup({ 
        id: new FormControl("", Validators.required) 
      })
    );
  }

  remove(index) {
    this.equipeOutros.removeAt(index);
  }

  async salvar() {


    await console.log(this.formEquipe.value);


    await this.app.alert('Alterado com sucesso');
  }

}
