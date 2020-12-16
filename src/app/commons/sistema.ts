import {User} from '@app/commons/common';

export interface EquipePeD {
  coordenador: User;
  diretor: User;
  gerente: User;
  outros: Array<User>;
}
