import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { ProjetoFacade } from '@app/facades';
import { RelatorioFinal } from '@app/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-relatorio-final-auditoria',
    templateUrl: './relatorio-final-auditoria.component.html',
    styleUrls: []
})
export class RelatorioFinalAuditoriaComponent implements OnInit {

    projeto: ProjetoFacade;
    relatorio: RelatorioFinal;
    form: FormGroup;

    constructor(protected app: AppService) { }


    ngOnInit() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {
            this.projeto = projeto;
            this.obterRelatorioFinal();
        });
    }

    obterRelatorioFinal() {
        this.projeto.REST.RelatorioFinal.listar<RelatorioFinal>().subscribe(relatorio => {
            this.relatorio = relatorio;
            this.buildForm(relatorio);
        }, error => {
            console.log({ error });
            this.buildForm();
        });
    }

    buildForm(relatorio?: RelatorioFinal) {
        this.form = new FormGroup({});
        ["produtoAlcancado", "justificativaProduto", "especificacaoProduto", "tecnicaPrevista", "justificativaTecnica",
            "descTecnica", "aplicabilidadePrevista", "justificativaAplicabilidade", "descTestes", "descAbrangencia",
            "descAmbito", "descAtividades"
        ].forEach(field => {
            const value = relatorio ? relatorio[field] : '';
            this.form.addControl(field, new FormControl(value, Validators.required))
        });

        this.form.get('produtoAlcancado').valueChanges.subscribe(v => {
            console.log({ v });

        });

        // produtoAlcancado: new FormControl(''),
        // justificativaProduto: new FormControl(''),
        // especificacaoProduto: new FormControl(''),
        // tecnicaPrevista: new FormControl(''),
        // justificativaTecnica: new FormControl(''),
        // descTecnica: new FormControl(''),
        // aplicabilidadePrevista: new FormControl(''),
        // justificativaAplicabilidade: new FormControl(''),
        // descTestes: new FormControl(''),
        // descAbrangencia: new FormControl(''),
        // descAmbito: new FormControl(''),
        // descAtividades: new FormControl(''),
    }

}
