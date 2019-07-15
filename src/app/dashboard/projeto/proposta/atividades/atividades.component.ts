import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AppService} from '@app/core/services/app.service';
import {ProjetoFacade} from '@app/facades/index';
import {LoadingComponent} from '@app/core/shared/app-components/loading/loading.component';
import {ProjetoGestaoAtividades} from '@app/models';
import {LoggerDirective} from '@app/logger/logger.directive';

@Component({
    selector: 'app-atividades',
    templateUrl: './atividades.component.html',
    styleUrls: []
})
export class AtividadesComponent implements OnInit {

    form: FormGroup;

    readonly atividades: Array<{ titulo: string; formName: string; resFormName: string; }> = [
        {
            titulo: 'Dedicação horária dos membros da equipe de gestão do Programa de P&D da Empresa, quadro efetivo.',
            formName: 'dedicacaoHorario',
            resFormName: 'resDedicacaoHorario'
        },
        {
            titulo: `Participação dos membros da equipe de gestão em eventos sobre pesquisa, 
            desenvolvimento e inovação relacionados ao setor elétrico e/ou em cursos de gestão tecnológica e da informação.`,
            formName: 'participacaoMembros',
            resFormName: 'resParticipacaoMembros',
        },
        {
            titulo: 'Desenvolvimento de ferramenta para gestão do Programa de P&D da Empresa, excluindose aquisição de equipamentos.',
            formName: 'desenvFerramenta',
            resFormName: 'resDesenvFerramenta'
        },
        {
            titulo: 'Prospecção tecnológica e demais atividades necessárias ao planejamento e à elaboração do plano estratégico de investimento em P&D.',
            formName: 'prospTecnologica',
            resFormName: 'resProspTecnologica'
        },
        {
            titulo: 'Divulgação de resultados de projetos de P&D, concluídos e/ou em execução.',
            formName: 'divulgacaoResultados',
            resFormName: 'resDivulgacaoResultados'
        },
        {
            titulo: 'Participação dos responsáveis técnicos pelos projetos de P&D nas avaliações presenciais convocadas pela ANEEL.',
            formName: 'participacaoTecnicos',
            resFormName: 'resParticipacaoTecnicos'
        },
        {
            titulo: 'Buscas de anterioridade no Instituto Nacional da Propriedade Industrial (INPI).',
            formName: 'buscaAnterioridade',
            resFormName: 'resBuscaAnterioridade'
        },
        {
            titulo: 'Contratação de auditoria contábil e financeira para os projetos concluídos.',
            formName: 'contratacaoAuditoria',
            resFormName: 'resContratacaoAuditoria'
        },
        {
            titulo: 'Apoio à realização do CITENEL.',
            formName: 'apoioCitenel',
            resFormName: 'resApoioCitenel'
        },
    ];

    projetoAtividades: any;
    projeto: ProjetoFacade;

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(LoggerDirective) logger: LoggerDirective;

    constructor(protected app: AppService) {
    }

    async ngOnInit() {
        this.projeto = await this.app.projetos.getCurrent();
        this.setup();
    }

    setup() {
        this.loading.show();
        this.projeto.REST.AtividadesGestao.listar<ProjetoGestaoAtividades>().subscribe(atividades => {
            this.form = new FormGroup({});

            this.atividades.forEach(atividade => {
                this.form.addControl(atividade.formName, new FormControl(''));
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
                this.loading.hide();
                if (result.sucesso) {
                    this.projeto.REST.AtividadesGestao.clearCache();
                    const idf = this.form.get('id');
                    this.form.removeControl('projetoId');
                    this.form.addControl('id', new FormControl(result.id));
                    this.app.alert('Salvo com sucesso!');
                    if (idf) {
                        this.logger.saveUpdate();
                    } else {
                        this.logger.saveCreate();
                    }
                } else {
                    this.app.alert(result.inconsistencias);
                }

            }, error => {
                this.app.alert(error.message);
                this.loading.hide();
            });

        }
    }

}
