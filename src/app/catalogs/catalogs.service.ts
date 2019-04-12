import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Empresa, ProjetoStatus, Segmento, TiposCompartilhamento, TextValue, Permissao} from '@app/models';
import {of, Observable} from 'rxjs';
import {map, share, first} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CatalogsService {


    protected cache = new Map();
    protected observables: { [propName: string]: Observable<any> } = {};

    constructor(private http: HttpClient) {
        console.log('CatalogsService OK');
    }

    protected getData<T>(key: string, url: string): Observable<T> {

        const cached = this.cache.get(key);

        if (cached) {
            return of(cached);
        } else if (this.observables[key]) {
            return this.observables[key];
        } else {
            this.observables[key] = this.http.get<T>(url)
                .pipe(
                    map(r => {
                        this.cache.set(key, r);
                        return r;
                    }),
                    share()
                );
            return this.observables[key];
        }
    }

    permissoes() {
        return this.getData<Array<Permissao>>('permissoes', `catalogs/permissoes`);
    }

    empresas() {
        return this.getData<Array<Empresa>>('empresas', `catalogs/empresas`);
    }

    empresa(id: number) {
        return this.empresas().pipe(map(empresas => empresas.find(e => e.id === id)));
    }

    status() {
        return this.getData<Array<ProjetoStatus>>('status', `catalogs/status`);
    }

    segmentos() {
        return this.getData<Array<Segmento>>('segmentos', `catalogs/segmentos`);
    }

    temas() {
        return this.getData<any>('temas', `catalogs/temas`);
    }

    estados() {
        return this.getData<any>('estados', `catalogs/Estados`);
    }

    categoriasContabeisGestao() {
        return this.getData<Array<any>>('categoriasContabeisGestao', `catalogs/categoriascontabeisgestao`);
    }

    paises() {
        return this.getData<Array<{ id: number; nome: string; }>>('paises', `catalogs/Paises`);
    }

    tipoCompartilhamento() {
        return of<Array<TextValue>>(TiposCompartilhamento);
    }

    produtoFasesCadeia() {
        return this.getData<Array<{ id: number; nome: string; }>>('produtoFasesCadeia', `catalogs/ProdutoFasesCadeia`);
    }
}
