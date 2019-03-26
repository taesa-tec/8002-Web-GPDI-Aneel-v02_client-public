import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '@app/app.service';
import { ProjetoFacade } from '@app/facades';
import { LoadingComponent } from '@app/shared/loading/loading.component';
import { ProjetoGestaoAtividades } from '@app/models';

@Component({
    selector: 'app-atividades',
    templateUrl: './atividades.component.html',
    styleUrls: []
})
export class AtividadesComponent implements OnInit {

    form: FormGroup;
    disabled = false;

    readonly atividades: Array<{ titulo: string; formName: string; }> = [
        {
            titulo: "Dedicação horária dos membros da equipe de gestão do Programa de P&D da Empresa, quadro efetivo.",
            formName: "dedicacaoHorario"
        },
        {
            titulo: `Participação dos membros da equipe de gestão em eventos sobre pesquisa, 
            desenvolvimento e inovação relacionados ao setor elétrico e/ou em cursos de gestão tecnológica e da informação.`,
            formName: "participacaoMembros"
        },
        {
            titulo: "Desenvolvimento de ferramenta para gestão do Programa de P&D da Empresa, excluindose aquisição de equipamentos.",
            formName: "desenvFerramenta"
        },
        {
            titulo: "Prospecção tecnológica e demais atividades necessárias ao planejamento e à elaboração do plano estratégico de investimento em P&D.",
            formName: "prospTecnologica"
        },
        {
            titulo: "Divulgação de resultados de projetos de P&D, concluídos e/ou em execução.",
            formName: "divulgacaoResultados"
        },
        {
            titulo: "Participação dos responsáveis técnicos pelos projetos de P&D nas avaliações presenciais convocadas pela ANEEL.",
            formName: "participacaoTecnicos"
        },
        {
            titulo: "Buscas de anterioridade no Instituto Nacional da Propriedade Industrial (INPI).",
            formName: "buscaAnterioridade"
        },
        {
            titulo: "Contratação de auditoria contábil e financeira para os projetos concluídos.",
            formName: "contratacaoAuditoria"
        },
        {
            titulo: "Apoio à realização do CITENEL.",
            formName: "apoioCitenel"
        },
    ];

    projetoAtividades: any;
    projeto: ProjetoFacade;

    @ViewChild(LoadingComponent) loading: LoadingComponent;

    constructor(protected app: AppService) { }

    ngOnInit() {
        this.app.projetos.projetoLoaded.subscribe(projeto => {

            this.projeto = projeto;
            this.setup();
        });

    }
    setup() {
        this.loading.show();
        this.projeto.REST.AtividadesGestao.listar<ProjetoGestaoAtividades>().subscribe(atividades => {
            this.form = new FormGroup({});

            this.atividades.forEach(atividade => {
                this.form.addControl(atividade.formName, new FormControl({ value: '', disabled: this.disabled }, Validators.required));
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

    submit() {
        if (this.form.valid) {
            const request = this.form.get('id') ?
                this.projeto.REST.AtividadesGestao.editar(this.form.value) :
                this.projeto.REST.AtividadesGestao.criar(this.form.value);
            this.loading.show();
            request.subscribe(result => {
                if (result.sucesso) {
                    this.form.removeControl('projetoId');
                    this.form.addControl('id', new FormControl(result.id));
                    this.app.alert('Salvo com sucesso!');

                } else {
                    this.app.alert(result.inconsistencias);
                }
                this.loading.hide();
            }, error => {
                this.app.alert(error.message);
                this.loading.hide();
            })

        }
    }

}
