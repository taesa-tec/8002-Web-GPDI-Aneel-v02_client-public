
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

export enum XmlType {
    ProjetoPed = "ProjetoPed",
    InteresseProjetoPed = "InteresseProjetoPed",
    InicioExecucaoProjeto = "InicioExecucaoProjeto",
    ProrrogaExecucaoProjeto = "ProrrogaExecucaoProjeto",
    RelatorioFinalPed = "RelatorioFinalPed",
    RelatorioAuditoriaPed = "RelatorioAuditoriaPed"
}