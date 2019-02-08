import { UserRole } from './enums';
import { TextValue } from './common';

export const Roles: Array<TextValue> = [
  { text: "Administrador", value: UserRole.Administrador },
  { text: "Usuário Padrão", value: UserRole.User }
];

export const TiposProdutos: Array<TextValue> = [
  { text: "Conceito ou Metodologia", value: "CM" },
  { text: "Software", value: "SW" },
  { text: "Sistema", value: "SM" },
  { text: "Material ou Substância", value: "MS" },
  { text: "Componente ou Dispositivo", value: "CD" },
  { text: "Máquina ou Equipamento", value: "ME" }
];

export const FasesCadeiaInovacao: Array<TextValue> = [
  { text: "Pesquisa Básica Dirigida", value: "PB" },
  { text: "Pesquisa Aplicada", value: "PA" },
  { text: "Desenvolvimento Experimental", value: "DE" },
  { text: "Cabeça de série", value: "CS" },
  { text: "Lote Pioneiro", value: "LP" },
  { text: "Inserção no Mercado", value: "IM" },
];


