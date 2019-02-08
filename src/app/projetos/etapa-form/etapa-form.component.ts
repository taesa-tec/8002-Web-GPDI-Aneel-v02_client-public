import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosService } from '@app/projetos/projetos.service';
import { Produto, EtapaProduto, Projeto } from '@app/models';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { zip, timer } from 'rxjs';
import { AppService } from '@app/app.service';


@Component({
  selector: 'app-etapa-form',
  templateUrl: './etapa-form.component.html',
  styleUrls: ['./etapa-form.component.scss']
})
export class EtapaFormComponent implements OnInit {

  etapa;
  projeto: Projeto;
  form: FormGroup;
  produtos: Produto[] = [];
  produtosGroup: FormArray = new FormArray([]);

  constructor(public activeModal: NgbActiveModal, private projetoService: ProjetosService, protected app: AppService) { }



  ngOnInit() {
    const produtos$ = this.projetoService.getProdutos(this.projeto.id);
    this.setup();
    zip(produtos$).subscribe(([produtos]) => {
      this.produtos = produtos;
    });
  }

  setup() {
    this.form = new FormGroup({
      projetoId: new FormControl(this.projeto.id),
      desc: new FormControl(this.etapa.desc || '', [Validators.required]),
      EtapaProdutos: this.produtosGroup
    });

    if (this.etapa.id) {
      this.form.addControl('id', new FormControl(this.etapa.id));
    }

    timer(2000, 10000).subscribe(() => console.log(this.form.value));
  }

  adicionarProduto(id: number) {
    this.produtosGroup.push(new FormGroup({ ProdutoId: new FormControl('', Validators.required) }));
  }

  removerProduto(index) {
    this.produtosGroup.removeAt(index);
  }

  submit() {
    if (this.form.valid) {
      const v = this.form.value;
      const request = this.etapa.id ? this.projetoService.editarEtapa(v) : this.projetoService.criarEtapa(v);
      request.subscribe(r => {
        if (r.sucesso) {
          this.activeModal.close(r);
        } else {
          this.app.alert(r.inconsistencias.join(', '));
        }
      });
    }
  }

}
