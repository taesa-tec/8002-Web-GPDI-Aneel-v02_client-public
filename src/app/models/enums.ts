
export enum UserRole {
    Administrador = 'Admin-APIGestor',
    User = 'User-APIGestor'
}

export enum ProjetoAccess {
    Todos = 1,
    Leitura = 2,
    Escrita = 4,
    Aprovador = 8,
    Administrador = 15,
}

export enum XmlType {
    ProjetoPed = "ProjetoPed",
    InteresseProjetoPed = "InteresseProjetoPed",
    InicioExecucaoProjeto = "InicioExecucaoProjeto",
    ProrrogaExecucaoProjeto = "ProrrogaExecucaoProjeto",
    RelatorioFinalPed = "RelatorioFinalPed",
    RelatorioAuditoriaPed = "RelatorioAuditoriaPed"
}