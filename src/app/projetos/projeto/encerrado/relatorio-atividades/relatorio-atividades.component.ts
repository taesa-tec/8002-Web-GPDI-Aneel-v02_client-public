import { Component, OnInit } from '@angular/core';
import { AtividadesComponent } from '../../proposta/atividades/atividades.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProjetoGestaoAtividades } from '@app/models';

@Component({
    selector: 'app-relatorio-atividades',
    templateUrl: './relatorio-atividades.component.html',
    styles: []
})
export class RelatorioAtividadesComponent extends AtividadesComponent {
    setup() {
        this.loading.show();
        this.projeto.REST.AtividadesGestao.listar<ProjetoGestaoAtividades>().subscribe(atividades => {
            console.log({ atividades });

            this.form = new FormGroup({});

            this.atividades.forEach(atividade => {

                const resFormName = atividade.formName.substr(0, 1).toUpperCase().concat(atividade.formName.substr(1));
                this.form.addControl(atividade.formName, new FormControl({ value: '', disabled: true }));
                this.form.addControl(atividade.resFormName, new FormControl(''));
            });

            if (atividades) {
                this.form.addControl('id', new FormControl(atividades.id));
                this.projetoAtividades = atividades;
                try {
                    this.form.patchValue(atividades);
                } catch (e) {
                    console.log(e);

                }
            } else {
                this.form.addControl('projetoId', new FormControl(this.projeto.id));
            }
            this.loading.hide();
        });
    }

}
