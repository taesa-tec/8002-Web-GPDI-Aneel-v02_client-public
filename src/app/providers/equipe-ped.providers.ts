import {InjectionToken, Provider} from '@angular/core';
import {EquipePeD, User} from '@app/models';
import {UsersService} from '@app/services/users.service';
import {SistemaService} from '@app/services/sistema.service';

export const EQUIPE_PED = new InjectionToken<EquipePeD>('equipe_ped');

export const equipePeDProvider: Provider = {
  provide: EQUIPE_PED,
  useFactory: (service: SistemaService) => service.equipePeD,
  multi: false,
  deps: [SistemaService]
};


