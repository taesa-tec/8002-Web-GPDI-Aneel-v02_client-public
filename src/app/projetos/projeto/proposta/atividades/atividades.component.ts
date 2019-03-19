import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-atividades',
    templateUrl: './atividades.component.html',
    styleUrls: []
})
export class AtividadesComponent implements OnInit {

    form: FormGroup;

    atividades: Array<{ titulo: string; formName: string; }> = [
        {
            titulo: "Dedicação horária dos membros da equipe de gestão do Programa de P&D da Empresa, quadro efetivo.",
            formName: ""
        },
        {
            titulo: "Participação dos membros da equipe de gestão em eventos sobre pesquisa, desenvolvimento e inovação relacionados ao setor elétrico e/ou em cursos de gestão tecnológica e da informação.",
            formName: ""
        },
        {
            titulo: "Desenvolvimento de ferramenta para gestão do Programa de P&D da Empresa, excluindose aquisição de equipamentos.",
            formName: ""
        },
        {
            titulo: "Prospecção tecnológica e demais atividades necessárias ao planejamento e à elaboração do plano estratégico de investimento em P&D.",
            formName: ""
        },
        {
            titulo: "Divulgação de resultados de projetos de P&D, concluídos e/ou em execução.",
            formName: ""
        },
        {
            titulo: "Participação dos responsáveis técnicos pelos projetos de P&D nas avaliações presenciais convocadas pela ANEEL.",
            formName: ""
        },
        {
            titulo: "Buscas de anterioridade no Instituto Nacional da Propriedade Industrial (INPI).",
            formName: ""
        },
        {
            titulo: "Contratação de auditoria contábil e financeira para os projetos concluídos.",
            formName: ""
        },
        {
            titulo: "Apoio à realização do CITENEL.",
            formName: ""
        },
    ];

    constructor() { }

    ngOnInit() {
        this.form = new FormGroup({});
    }

}
