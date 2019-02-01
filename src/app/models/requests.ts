export interface LoginRequest {
  email: string;
  password: string;
}

export interface RecoverRequest {
  email: string;
}
export interface NewpassRequest {
  email: string;
  newPassword: string;
  resetToken: string;
}
export interface CreateUserRequest {
  nomeCompleto: string;
  cpf?: string;
  email: string;
  role: string;
  status: 0 | 1;
  
}
export interface CreateProjectRequest {
  titulo: string;
  tituloDesc: string;
  numero: string;
  catalogStatusId: number;
  catalogEmpresaId: number;
}

