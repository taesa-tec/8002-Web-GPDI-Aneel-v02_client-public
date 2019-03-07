import { GenericFacade } from './generic.facade';
import { RecursoHumano } from '@app/models';
import { EmpresaProjetoFacade } from './empresa.facade';

export class RecursoHumanoFacade extends GenericFacade<RecursoHumano>{
    _empresa: EmpresaProjetoFacade;

    constructor(_recurso: RecursoHumano) {
        super(_recurso);
        this._empresa = new EmpresaProjetoFacade(_recurso.empresa);
        Object.defineProperty(this, 'empresa', { get: () => this._empresa });
    }
}
