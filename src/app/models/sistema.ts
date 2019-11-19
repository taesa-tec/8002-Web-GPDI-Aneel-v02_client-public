import {User} from '@app/models/common';

export interface EquipePeD {
  coordenador: User;
  diretor: User;
  gerente: User;
  outros: Array<User>;
}
