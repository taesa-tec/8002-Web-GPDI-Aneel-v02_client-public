import {User} from '@app/commons/common';

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
