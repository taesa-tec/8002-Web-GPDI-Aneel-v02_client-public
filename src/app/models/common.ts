import { ProjetoStatus, UserRole, ProjetoAccess } from './enums';


// export class Model {
//   constructor(fields?: { [propName: string]: any }) {
//     if (fields) {
//       Object.assign(this, fields);
//     }
//   }
// }
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

export type Projetos = Array<Projeto>;

export interface User {
  id?: string;
  userName?: string;
  normalizedUserName?: string;
  email: string;
  nomeCompleto: any;
  role: UserRole;
  status: number;
  razaoSocial?: any;
  fotoPerfil?: any;
  cpf?: any;
  catalogEmpresa?: Empresa;
  catalogEmpresaId?: number | '';
  ultimoLogin?: string;
  dataCadastro?: string;
  dataAtualizacao?: string;
  normalizedEmail?: string;
  emailConfirmed?: boolean;
  passwordHash?: string;
  securityStamp?: string;
  concurrencyStamp?: string;
  phoneNumber?: any;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: any;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
}

export const Roles: Array<{ text: string; value: UserRole }> = [
  { text: "Administrador", value: UserRole.Administrador },
  { text: "Usuário Padrão", value: UserRole.User }
];

export const NiveisAcessoProjeto: Array<{ text: string; value: ProjetoAccess }> = [
  { text: "Administrador", value: ProjetoAccess.Administrador },
  { text: "Aprovador", value: ProjetoAccess.Aprovador },
  { text: "Leitura e Escrita", value: ProjetoAccess.LeituraEscrita },
  { text: "Leitura", value: ProjetoAccess.Leitura }

];
