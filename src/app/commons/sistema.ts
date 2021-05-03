import {User} from '@app/commons/common';
import {InjectionToken} from '@angular/core';

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
