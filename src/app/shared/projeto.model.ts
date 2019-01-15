import { Produto } from './produto.model';

export enum Status {
    Desconhecido = "",
    Proposta = "1",
    Iniciado = "2",
    Encerrado = "3"
}

export interface Projeto {
    created: string;
    projetoId: number;
    titulo: string;
    tituloDesc: string;
    numero: string;
    empresaProponente: number;
    status: Status;
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


