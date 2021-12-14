import {User} from '@app/commons/common';

export interface LoginResponse {
  created?: string;
  expiration?: string;
  accessToken?: string;
  user: User;
}

export interface ResultadoResponse {
  acao: string;
  id?: any;
  sucesso: boolean;
  inconsistencias: string[];
}


