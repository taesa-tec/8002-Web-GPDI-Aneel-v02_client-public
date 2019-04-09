import {CreateLogProjetoRequest} from '@app/models';

export abstract class Logger<T> implements CreateLogProjetoRequest {


    protected constructor(
        public projetoId: number,
        public userId: string,
        public tela: string,
        public acao: 'Create' | 'Delete' | 'Update',
        public data: T,
        protected statusAnteriorData: T ) {
    }

    abstract getStatusAnterior(): string ;

    abstract getStatusNovo(): string ;

    get statusAnterior(): string {
        return this.getStatusAnterior();
    }

    get statusNovo(): string {
        return this.getStatusNovo();
    }


}
