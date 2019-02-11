import { UserRole, ProjetoAccess } from './enums';


// export class Model {
//   constructor(fields?: { [propName: string]: any }) {
//     if (fields) {
//       Object.assign(this, fields);
//     }
//   }
// }
export interface TextValue {
  text: string; value: any;
}
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
export interface Segmento {
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

export interface ProjetoStatus {
  id: number;
  status: string;
}
export interface Projeto {
  created: string;
  id: number;
  titulo: string;
  tipo: number;
  dataInicio?: any;
  codigo?: any;
  tituloDesc: string;
  numero: string;
  catalogEmpresaId: number;
  catalogEmpresa?: Empresa;
  catalogStatusId: number;
  catalogStatus?: ProjetoStatus;
  catalogSegmentoId?: any;
  catalogSegmento?: any;
  avaliacaoInicial?: any;
  compartResultados?: any;
  motivacao?: any;
  originalidade?: any;
  aplicabilidade?: any;
  relevancia?: any;
  razoabilidade?: any;
  pesquisas?: any;
  produtos?: any;
  recursosHumanos?: any;
  alocacoesRh?: any;
  recursosMateriais?: any;
  alocacoesRm?: any;
  etapas?: any;
  tema?: any;
  usersProjeto?: any;
  empresas?: any;
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

export interface CatalogUserPermissao {
  id: number;
  valor: string;
  nome: string;
}

export interface UserProjeto {
  id: number;
  userId: string;
  applicationUser?: any;
  projetoId: number;
  projeto: Projeto;
  catalogUserPermissaoId: number;
  catalogUserPermissao: CatalogUserPermissao;
}

export interface Tema {
  id: number;
  nome: string;
  valor: string;
  subTemas: SubTema[];
}

export interface CatalogTema {
  id: number;
  nome: string;
  valor: string;
  subTemas: SubTema[];
}

export interface CatalogSubTema {
  subTemaId: number;
  catalogTemaId: number;
  nome: string;
  valor: string;
}

export interface SubTema {
  id: number;
  temaId: number;
  catalogSubTemaId: number;
  catalogSubTema: CatalogSubTema;
  outroDesc?: any;
}

export interface TemaProjeto {
  id: number;
  projetoId: number;
  catalogTemaId: number;
  catalogTema: CatalogTema;
  outroDesc?: any;
  subTemas: SubTema[];
  uploads: any[];
}


// Produtos

export interface Produto {
  created: string;
  id: number;
  projetoId: number;
  titulo: string;
  desc: string;
  classificacao: number;
  classificacaoValor: string;
  tipo: number;
  tipoValor: string;
  faseCadeia: number;
  faseCadeiaValor: string;
  etapaProduto: any[];
}

export interface RecursoMaterial {
  id: number;
  projetoId: number;
  nome: string;
  categoriaContabil: number;
  categoriaContabilValor: string;
  valorUnitario: string;
  especificacao: string;
}