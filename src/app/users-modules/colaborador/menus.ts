import {HEADER_MENU, SIDEBAR_MENU} from '@app/commons';
import {
  Demandas,
  MeuCadastro,
} from '@app/users-modules/shared/menus';


export const SidebarMenu = {
  provide: SIDEBAR_MENU,
  useValue: [
    Demandas
  ]
};

export const HeaderMenu = {
  provide: HEADER_MENU,
  useValue: [
    MeuCadastro
  ]
};


