
export enum UserRole {
    Administrador = 'Admin-APIGestor',
    User = 'User-APIGestor'
}

export enum ProjetoAccess {
    Leitura = 1,
    Escrita = 2,
    Aprovador = 4,
    Administrador = 7,
}

export enum XmlType {
    ProjetoPed = "ProjetoPed",
    InteresseProjetoPed = "InteresseProjetoPed",
    InicioExecucaoProjeto = "InicioExecucaoProjeto",
    ProrrogaExecucaoProjeto = "ProrrogaExecucaoProjeto",
    RelatorioFinalPed = "RelatorioFinalPed",
    RelatorioAuditoriaPed = "RelatorioAuditoriaPed"
}