import { EtapaProduto } from './common';

/**
 * Users Request
 */

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RecoverRequest {
    email: string;
}
export interface NewpassRequest {
    email: string;
    newPassword: string;
    resetToken: string;
}
export interface CreateUserRequest {
    nomeCompleto: string;
    cpf?: string;
    email: string;
    role: string;
    status: 0 | 1;
}

/**
 * Projeto Requests
 */
export interface CreateProjectRequest {
    titulo: string;
    tituloDesc: string;
    numero: string;
    catalogStatusId: number;
    catalogEmpresaId: number;
}

export interface ProjetoDataInicio {
    id: number;
    dataInicio: string;
}

/**
 * Temas Requests
 */
export interface SubTemaRequest {
    catalogSubTemaId: number;
    outroDesc?: string;
}

export interface CreateTemaRequest {
    projetoId: number;
    catalogTemaId: number;
    outroDesc: string;
    subTemas: SubTemaRequest[];
}

export interface EditTemaRequest {
    id: number;
    catalogTemaid: number;
    outroDesc: string;
    subTemas: SubTemaRequest[];
}

/**
 * Produto Request
 */

export interface CreateProdutoRequest {
    projetoId: number;
    titulo: string;
    desc: string;
    classificacao: string;
    tipo: string;
    faseCadeia: string;
}

export interface EditProduto {
    id: number;
    projetoId: number;
    titulo: string;
    desc: string;
    classificacao: string;
    tipo: string;
    faseCadeia: string;
}



export interface CriarEtapaRequest {
    projetoId: number;
    desc: string;
    etapaProdutos: EtapaProduto[];
}

export interface EditEtapaRequest {
    id: number;
    desc: string;
    etapaProdutos: EtapaProduto[];
}

/**
 * Empresa Request
 */

export interface CreateEmpresaRequest {
    projetoId: number;
    classificacao: 'Energia' | 'Executora' | 'Parceira';
    catalogEmpresaId?: number;
    catalogEstadoId?: number;
    cnpj?: string;
    razaoSocial?: string;
}

export interface EditEmpresaRequest {
    id: number;
    classificacao: 'Energia' | 'Executora' | 'Parceira';
    catalogEmpresaId: number;
    catalogEstadoId: number;
    cnpj: string;
    razaoSocial: string;
}

/**
 * RH Request
 */

export interface CreateRHRequest {
    projetoId: number;
    empresaId: number;
    valorHora: string;
    nomeCompleto: string;
    titulacao: string;
    funcao: string;
    nacionalidade: string;
    cpf: string;
    passaporte: string;
    urlCurriculo: string;
}

export interface EditRH {
    id: number;
    empresaid: number;
    valorHora: string;
    nomeCompleto: string;
    titulacao: string;
    funcao: string;
    nacionalidade: string;
    cpf: string;
    passaporte: string;
    urlCurriculo: string;
}

/**
 * Alocação RH Request
 */

export interface CreateAlocacaoRHRequest {
    projetoId: number;
    recursoHumanoId: number;
    etapaId: number;
    empresaId: number;
    valorHora: string;
    hrsMes1: number;
    hrsMes2: number;
    hrsMes3: number;
    hrsMes4: number;
    hrsMes5: number;
    hrsMes6: number;
    justificativa: string;
}

export interface EditAlocacaoRH {
    id: number;
    recursoHumanoId: number;
    etapaId: number;
    empresaId: number;
    hrsMes1: number;
    hrsMes2: number;
    hrsMes3: number;
    hrsMes4: number;
    hrsMes5: number;
    hrsMes6: number;
    justificativa: string;
}

/**
 * Recurso Material Request
 */

export interface CreateRecursoMaterialRequest {
    projetoId: number;
    nome: string;
    categoriaContabil: string;
    valorUnitario: string;
    especificacao: string;
}

export interface EditRecursoMaterial {
    id: number;
    nome: string;
    categoriaContabil: string;
    valorUnitario: string;
    especificacao: string;
}

/**
 * Alocacao Recurso Material Request
 */

export interface CreateAlocacaoRMRequest {
    projetoId: number;
    recursoMaterialId: number;
    etapaId: number;
    empresaFinanciadoraId: number;
    empresaRecebedoraId: number;
    qtd: number;
    justificativa: string;
}

export interface EditAlocacaoRM {
    id: number;
    recursoMaterialid: number;
    etapaid: number;
    empresaFinanciadoraid: number;
    empresaRecebedoraid: number;
    qtd: number;
    justificativa: string;
}

/**
 * Log Projeto Request
 */

export interface CreateLogProjetoRequest {
    userId: string;
    projetoId: number;
    tela: string;
    acao: string;
    statusAnterior: string;
    statusNovo: string;
}

export interface ProrrogarProjetoRequest {
    id: number;
    dataFim: string;
    etapa: {
        desc: string;
        etapaProdutos: Array<{ produtoId: number; }>;
    };
}