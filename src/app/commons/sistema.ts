import {User} from '@app/commons/common';
import {InjectionToken} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface EquipePeD {
  coordenador: User;
  diretor: User;
  gerente: User;
  outros: Array<User>;
}

export interface ContratoPadrao {
  titulo: string;
  header: string;
  conteudo: string;
  footer: string;
  id: number;
}

export const EQUIPE_PED = new InjectionToken<EquipePeD>('Equipe PeD');
export const KONAMI_CODE = new InjectionToken<BehaviorSubject<boolean>>('KC', {
  providedIn: 'root',
  factory: () => new BehaviorSubject<boolean>(false)
});
export const KONAMI_CODE_MAP = new Map([
  ['ArrowUp', 'u'],
  ['ArrowRight', 'r'],
  ['ArrowDown', 'd'],
  ['ArrowLeft', 'l'],
  ['a', 'a'],
  ['b', 'b'],
]);
