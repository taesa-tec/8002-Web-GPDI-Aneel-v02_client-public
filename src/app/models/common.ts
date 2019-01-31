
export interface MessageAlert {
    message: string;
    type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    icon?: string;
}

export interface UF {
    id: number;
    nome: string;
    valor: string;
}

export interface Empresa {
    id: number;
    nome: string;
    valor: string;
}
export interface Permissao {
    id: number;
    nome: string;
    valor: string;
}

export interface SubTema {
    subTemaId: number;
    catalogTemaId: number;
    nome: string;
    valor: string;
}

export interface Tema {
    id: number;
    nome: string;
    valor: string;
    subTemas: SubTema[];
}

export enum ProjetoStatus {
    Desconhecido = "",
    Proposta = "1",
    Iniciado = "2",
    Encerrado = "3"
}
export interface Produto {
    created: string;
    produtoId: number;
    titulo: string;
    desc: string;
    projetoId: number;
}
export interface Projeto {
    created: string;
    projetoId: number;
    titulo: string;
    tituloDesc: string;
    numero: string;
    empresaProponente: number;
    status: ProjetoStatus;
    segmentoId: number;
    avaliacaoInicial: string;
    compartResultados: string;
    motivacao: string;
    originalidade: string;
    aplicabilidade: string;
    relevancia: string;
    razoabilidade: string;
    pesquisas: string;
    produtos: Produto[];
}

export interface User {
    catalogEmpresaId?: any;
    status: number;
    nomeCompleto?: any;
    catalogEmpresa?: any;
    razaoSocial?: any;
    fotoPerfil?: any;
    cpf?: any;
    ultimoLogin: string;
    dataCadastro: string;
    dataAtualizacao: string;
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber?: any;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd?: any;
    lockoutEnabled: boolean;
    accessFailedCount: number;
}

export interface CurrentUser {
    catalogEmpresaId?: any;
    status: number;
    nomeCompleto?: any;
    catalogEmpresa?: any;
    razaoSocial?: any;
    fotoPerfil?: any;
    cpf?: any;
    ultimoLogin: string;
    dataCadastro: string;
    dataAtualizacao: string;
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber?: any;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd?: any;
    lockoutEnabled: boolean;
    accessFailedCount: number;
}
