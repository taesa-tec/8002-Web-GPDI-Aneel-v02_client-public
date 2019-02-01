
export enum UserRole {
  Administrador = 'Admin-APIGestor',
  User = 'User-APIGestor'
}

export enum ProjetoStatus {
  Desconhecido = "",
  Proposta = "1",
  Iniciado = "2",
  Encerrado = "3"
}

export enum ProjetoAccess {
  Administrador,
  Aprovador,
  LeituraEscrita,
  Leitura
}