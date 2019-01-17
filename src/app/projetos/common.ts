export enum ProjetoStatus {
    Desconhecido = "",
    Proposta = "1",
    Iniciado = "2",
    Encerrado = "3"
}

export interface Empresa {
    empresaId: number;
    nomeFantasia: string;
    razaoSocial: string;
    uf: string;
}

export interface Produto {
    created: string;
    produtoId: number;
    titulo: string;
    desc: string;
    projetoId: number;
}

export interface Projeto {
    created: string;
    projetoId: number;
    titulo: string;
    tituloDesc: string;
    numero: string;
    empresaProponente: number;
    status: ProjetoStatus;
    segmentoId: number;
    avaliacaoInicial: string;
    compartResultados: string;
    motivacao: string;
    originalidade: string;
    aplicabilidade: string;
    relevancia: string;
    razoabilidade: string;
    pesquisas: string;
    produtos: Produto[];
}

export interface Resultado {
    acao: string;
    sucesso: boolean;
    inconsistencias: string[];
}
