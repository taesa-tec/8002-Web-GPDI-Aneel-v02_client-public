export interface Demanda {
  id: number;
  comentarios: Array<any>;
  createdAt: string;
  captacaoDate?: string;
  criador?: any;
  criadorId: string;
  revisor?: any;
  revisorId?: string;
  etapaAtual: number;
  status: number;
  etapaAtualText: string;
  etapaStatusText: string;
  files?: any;
  superiorDireto?: any;
  superiorDiretoId?: string;
  titulo: string;
  especificacaoTecnicaFileId?: number;
}


export interface FormField {
  title: string;
  itemTitle: string;
  key: string;
  fieldType: string;
  genericType?: string;
  isArray: boolean;
  options?: Array<any>;
  hasFixedSize?: boolean;
  children: Array<FormField>;
  order: number;
  placeholder: '';
}

export enum FormFieldType {
  Empty,
  Form,
  Simple,
  SimpleList,
  RichText,
  RitchTextList,
  Generic
}

export interface Form extends FormField {
  fieldType: 'Form';
}
