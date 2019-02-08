import { UserRole } from './enums';

export const Roles: Array<{ text: string; value: UserRole }> = [
  { text: "Administrador", value: UserRole.Administrador },
  { text: "Usuário Padrão", value: UserRole.User }
];
