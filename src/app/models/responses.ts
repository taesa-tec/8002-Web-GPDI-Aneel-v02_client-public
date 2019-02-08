export interface LoginResponse {
  authenticated: boolean;
  created?: string;
  expiration?: string;
  accessToken?: string;
  message: string;
}

export interface ResultadoResponse {
  acao: string;
  id?: any;
  sucesso: boolean;
  inconsistencias: string[];
}


