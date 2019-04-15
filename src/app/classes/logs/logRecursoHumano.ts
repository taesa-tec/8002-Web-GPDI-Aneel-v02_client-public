import {LogFactory} from '@app/classes/log-factory.class';
import {EmpresaProjeto, RecursoHumano} from '@app/models';
import {buscar, formatarMoeda} from '@app/helper';
import {EmpresaProjetoFacade} from '@app/facades';


export class LogRecursoHumano extends LogFactory<{
    empresas: Array<EmpresaProjetoFacade>
    recurso: RecursoHumano,
    funcoes: Array<any>,
    titulos: Array<any>
}> {

    getStatus({empresas, funcoes, titulos, recurso}: { empresas: Array<any>; funcoes: Array<any>; titulos: Array<any>; recurso: RecursoHumano }): string {
        const status = [];
        const empresa = buscar(empresas, recurso.empresaId, 'id');
        const titulo = buscar(titulos, recurso.titulacaoValor, 'value');
        const funcao = buscar(funcoes, recurso.funcaoValor, 'value');
        console.log({empresa, titulo, funcao, recurso});
        try {
            status.concat([
                LogFactory.dataToHtml('Empresa', empresa ? empresa.text : ''),
                LogFactory.dataToHtml('Custo Hora', formatarMoeda(recurso.valorHora)),
                LogFactory.dataToHtml('Nome Completo', recurso.nomeCompleto),
                LogFactory.dataToHtml('Titulo', titulo ? titulo.text : ''),
                LogFactory.dataToHtml('Funções', funcao ? funcao.text : ''),
                LogFactory.dataToHtml('Nacionalidade', recurso.nacionalidade),
            ]);
            if (recurso.gerenteProjeto) {
                status.push(LogFactory.dataToHtml('Gerente do projeto?', recurso.gerenteProjeto));
            }
            if (recurso.cpf) {
                status.push(LogFactory.dataToHtml('Cpf', recurso.cpf));
            }
            status.push(LogFactory.dataToHtml('Endereço Currículo Lattes', recurso.urlCurriculo));
            console.log(status);
        } catch (e) {
            console.log(e);
        }
        return status.join('\n');
    }

}
