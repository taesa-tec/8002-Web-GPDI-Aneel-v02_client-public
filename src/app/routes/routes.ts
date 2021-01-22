import {UserRole} from '@app/commons';

export const AdminRootUrl = 'admin';
export const GestorRootUrl = 'gestor';
export const SuprimentoRootUrl = 'suprimento';
export const FornecedorRootUrl = 'fornecedor';

export const RootsUrl = new Map<string, string>(
  [
    [UserRole.Administrador, `/${AdminRootUrl}`],
    [UserRole.User, `/${GestorRootUrl}`],
    [UserRole.Suprimento, `/${SuprimentoRootUrl}`],
    [UserRole.Fornecedor, `/${FornecedorRootUrl}`],
  ]
);

