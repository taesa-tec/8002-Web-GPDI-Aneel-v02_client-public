export interface LoginRequest {
    email: string;
    password: string;
}

export interface CreateUserRequest {
    nomeCompleto: string;
    email: string;
    role: string;
    status: string;
    password: string;
}

export interface UpdateUserRequest {
    role: string;
    nomeCompleto: string;
    email: string;
    status: string;
    empresa: string;
    razaoSocial: string;
    fotoPerfil: string;
    catalogEmpresaId: number;
    cpf: string;
    id: string;
}

export interface CreateProjectRequest {
    titulo: string;
    tituloDesc: string;
    numero: string;
    catalogStatusId: number;
    catalogEmpresaId: number;
}

