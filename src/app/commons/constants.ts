import {UserRole, ProjetoAccess} from './enums';
import {TextValue} from './common';

export const Roles: Array<TextValue> = [

  {text: 'Colaborador', value: UserRole.Colaborador},
  {text: 'Equipe PDI', value: UserRole.User},
  {text: 'Suprimentos', value: UserRole.Suprimento},
  {text: 'Fornecedor', value: UserRole.Fornecedor},
  {text: 'Administrador', value: UserRole.Administrador},
];

export const NiveisUsuarios = {
  todos: ProjetoAccess.Todos,
  leitura: ProjetoAccess.Todos | ProjetoAccess.Leitura,
  leituraEscrita: ProjetoAccess.Todos | ProjetoAccess.Escrita | ProjetoAccess.Leitura,
  aprovador: ProjetoAccess.Todos | ProjetoAccess.Aprovador | ProjetoAccess.Leitura | ProjetoAccess.Escrita,
  // administrador: ProjetoAccess.Administrador,
  admin: ProjetoAccess.Administrador | ProjetoAccess.Todos | ProjetoAccess.Aprovador | ProjetoAccess.Leitura | ProjetoAccess.Escrita
};

export const TiposProdutos: Array<TextValue> = [
  {text: 'Conceito ou Metodologia', value: 'CM'},
  {text: 'Software', value: 'SW'},
  {text: 'Sistema', value: 'SM'},
  {text: 'Material ou Substância', value: 'MS'},
  {text: 'Componente ou Dispositivo', value: 'CD'},
  {text: 'Máquina ou Equipamento', value: 'ME'}
];

export const Atividades: Array<TextValue> = [
  {text: 'Dedicação horária dos membros da equipe de gestão do Programa de PDI da Empresa, quadro efetivo.', value: 'HH'},
  {
    text: 'Participação dos membros da equipe de gestão em eventos sobre pesquisa, desenvolvimento e inovação relacionados ao ' +
      'setor elétrico e/ou em cursos de gestão tecnológica e da informação. ',
    value: 'EC'
  },
  {text: 'Desenvolvimento de ferramenta para gestão do Programa de PDI da Empresa, excluindose aquisição de equipamentos.', value: 'FG'},
  {
    text: 'Prospecção tecnológica e demais atividades necessárias ao planejamento e' +
      ' à elaboração do plano estratégico de investimento em PDI.',
    value: 'PP'
  },
  {text: 'Divulgação de resultados de projetos de PDI, concluídos e/ou em execução.', value: 'RP'},
  {text: 'Participação dos responsáveis técnicos pelos projetos de PDI nas avaliações presenciais convocadas pela ANEEL.', value: 'AP'},
  {text: 'Buscas de anterioridade no Instituto Nacional da Propriedade Industrial (INPI).', value: 'BA'},
  {text: 'Contratação de auditoria contábil e financeira para os projetos concluídos.', value: 'CA'},
  {text: 'Apoio à realização do CITENEL.', value: 'AC'}
];

export const IndicadoresEconomicos: Array<TextValue> = [
  {text: 'Redução de Homem/Hora - Produtividade', value: 'PR1'},
  {text: 'Redução de Insumos - Produtividade', value: 'PR2'},
  {text: 'Redução de Tempo - Produtividade', value: 'PR3'},
  {text: 'Outro - Produtividade', value: 'PRX'},
  {text: 'Redução de DEC, FEC e TMA - Qualidade do Fornecimento', value: 'QF1'},
  {text: 'Redução de VTCDs e Outros Distúrbios - Qualidade do Fornecimento', value: 'QF2'},
  {text: 'Redução do Índice de Reclamações - Qualidade do Fornecimento', value: 'QF3'},
  {text: 'Outro - Qualidade do Fornecimento', value: 'QFX '},
  {text: 'Postergação de Investimento - Gestão de Ativos', value: 'GA1'},
  {text: 'Investimento Evitado - Gestão de Ativos', value: 'GA2'},
  {text: 'Redução de Roubos e Furtos - Gestão de Ativos', value: 'GA3'},
  {text: 'Outro - Gestão de Ativos', value: 'GAX'},
  {text: 'Redução de Inadimplência - Perdas Não Técnicas', value: 'NT1'},
  {text: 'Redução de Fraudes e Desvios - Perdas Não Técnicas', value: 'NT2'},
  {text: 'Redução de Erros de Medição - Perdas Não Técnicas', value: 'NT3'},
  {text: 'Redução de Perdas Indenizatórias - Perdas Não Técnicas', value: 'NT4'},
  {text: 'Outro - Perdas Não Técnicas', value: 'NTX '},
  {text: 'Redução no Custo da Energia - Mercado da Empresa', value: 'ME1'},
  {text: 'Redução nos Erros de Previsão - Mercado da Empresa', value: 'ME2'},
  {text: 'Outro - Mercado da Empresa', value: 'MEX '}, {
    text: 'Aumento da Demanda Disponível (Oferta) - Eficiência Energética',
    value: 'EE1 '
  },
  {text: 'Aumento da Energia Disponível (Oferta) - Eficiência Energética', value: 'EE2'},
  {text: 'Redução de Demanda (Uso Final) - Eficiência Energética', value: 'EE3'},
  {text: 'Energia Economizada (Uso Final) - Eficiência Energética', value: 'EE4'},
  {text: 'Outro - Eficiência Energética', value: 'EEX '},
  {text: 'Outro - Outro', value: 'OU'},
];

export const PropriedadeIntelectual: Array<TextValue> = [
  {text: 'Patente de Invenção', value: 'PI'},
  {text: 'Patente de Modelo de Utilidade', value: 'PU'},
  {text: 'Registro de Software', value: 'RS'},
  {text: 'Registro de Desenho Industrial', value: 'RD'},
];

export const TiposCompartilhamento: Array<TextValue> = [
  {text: 'Domínio Público', value: 'DP'},
  {text: 'Exclusivo da(s) empresa(s) de energia elétrica', value: 'EE'},
  {text: 'Exclusivo da(s) entidade(s) executora(s)', value: 'EX'},
  {text: 'Compartilhado entre as empresa(s) de energia elétrica e entidade(s) executora(s)', value: 'CE'},
];

export const Funcoes: Array<TextValue> = [
  {text: 'Coordenador', value: 'CO'},
  {text: 'Gerente', value: 'GE'},
  {text: 'Pesquisador', value: 'PE'},
  {text: 'Auxiliar Técnico', value: 'AT'},
  {text: 'Auxiliar Técnico Bolsista', value: 'AB'},
  {text: 'Auxiliar Administrativo', value: 'AA'}
];

export const Graduacoes: Array<TextValue> = [
  {text: 'Doutor', value: 'DO'},
  {text: 'Mestre', value: 'ME'},
  {text: 'Especialista', value: 'ES'},
  {text: 'Superior', value: 'SU'},
  {text: 'Técnico', value: 'TE'},
];

export const AcaoLog: Array<TextValue> = [
  {text: 'Criação', value: 'Create'},
  {text: 'Edição', value: 'Update'},
  {text: 'Exclusão', value: 'Delete'},
  {text: 'Consulta', value: 'Retrieve'},

];
