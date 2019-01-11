import { Produto } from './produto.model';

export interface Projeto {
    created: string;
    projetoId: number;
    titulo: string;
    tituloDesc: string;
    numero: string;
    empresaProponente: number;
    status: string;
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
