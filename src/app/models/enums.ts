
export enum UserRole {
  Administrador = 'Admin-APIGestor',
  User = 'User-APIGestor'
}

export enum ProjetoAccess {
  Administrador,
  Aprovador,
  LeituraEscrita,
  Leitura
}
export enum Segmentos {
  Geracao = 'G',
  Transmissao = 'T',
  Distribuicao = 'D',
  Comercializacao = 'C',

}

export enum ProjetoCompartilhamento {
  DominioPublico = 'DP',
  ExclusivoEmpresaEletrica = 'EE',
  ExclusivoEmpresaExecutora = 'EX',
  Compartilhado = 'CE'
}
