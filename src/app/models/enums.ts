
export enum UserRole {
    Administrador = 'Admin-APIGestor',
    User = 'User-APIGestor'
}

export enum ProjetoAccess {
    Todos = 1,
    Leitura = 2,
    Escrita = 4,
    Aprovador = 8,
    Administrador = 16,
}

export enum XmlType {
    // Pesquisa e desenvolvimento
    ProjetoPed = "ProjetoPed",
    InteresseProjetoPed = "InteresseProjetoPed",
    ProrrogaExecucaoProjeto = "ProrrogaExecucaoProjeto",
    RelatorioFinalPed = "RelatorioFinalPed",
    RelatorioAuditoriaPed = "RelatorioAuditoriaPed",

    // Gestão
    ProjetoGestao = "ProjetoGestao",
    RelatorioFinalGestao = "RelatorioFinalGestao",
    RelatorioAuditoriaGestao = "RelatorioAuditoriaGestao",

    // Todos
    InicioExecucaoProjeto = "InicioExecucaoProjeto",
}
