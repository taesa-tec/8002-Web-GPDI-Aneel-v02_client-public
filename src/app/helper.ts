import {formatCurrency} from '@angular/common';

export function formatarMoeda(valor: number) {
    return formatCurrency(valor, 'pt-br', 'R$');
}

export function buscar<T>(lista: Array<T>, search: any, predicado = 'id'): T | undefined {
    return lista.find(item => String(item[predicado]) === String(search));
}
