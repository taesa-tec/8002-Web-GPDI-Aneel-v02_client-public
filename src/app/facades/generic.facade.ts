import {Subject} from 'rxjs';

export class GenericFacade<T> {

    onUpdate = new Subject<{ prop: string; value: any; prev: any }>();

    constructor(protected _data: T) {
        if (_data) {
            Object.keys(this._data).forEach(key => {
                Object.defineProperty(this, key, {
                    get: () => this._data[key],
                    set: (value) => {
                        const prev = this._data[key];
                        this._data[key] = value;
                        this.onUpdate.next({prop: key, value, prev});
                    }
                });
            });
        } else {
            console.error('Data não pode ser null ou undefined - GenericFacade');
        }
    }
}
