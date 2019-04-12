import {LogFactory} from '@app/classes/log-factory.class';
import {RecursoHumano} from '@app/models';
import {buscar, formatarMoeda} from '@app/helper';
import {EmpresaProjetoFacade} from '@app/facades';


export class LogRecursoHumano extends LogFactory<{
    empresas: Array<any>,
    funcoes: Array<any>,
    titulos: Array<any>,
    recurso: RecursoHumano
}> {

    getStatus({empresas, funcoes, titulos, recurso}: { empresas: Array<EmpresaProjetoFacade>; funcoes: Array<any>; titulos: Array<any>; recurso: RecursoHumano }): string {

        const status = [
            LogFactory.dataToHtml('Empresa', buscar<EmpresaProjetoFacade>(empresas, recurso.empresaId).nome),
            LogFactory.dataToHtml('Custo Hora', formatarMoeda(recurso.valorHora)),
            LogFactory.dataToHtml('Nome Completo', recurso.nomeCompleto),
            LogFactory.dataToHtml('Titulo', buscar(titulos, recurso.titulacaoValor, 'valor').text),

            LogFactory.dataToHtml('Nacionalidade', recurso.nacionalidade),
        ];
        if (recurso.gerenteProjeto) {
            status.push(LogFactory.dataToHtml('Gerente do projeto?', recurso.gerenteProjeto));
        }
        if (recurso.cpf) {
            status.push(LogFactory.dataToHtml('Cpf', recurso.cpf));
        }
        return '';
    }

}
