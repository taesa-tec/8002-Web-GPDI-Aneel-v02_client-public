export interface Demanda {
  comentarios: Array<any>;
  createdAt: string;
  criador?: any;
  criadorId: string;
  etapaAtual: number;
  etapaStatus: number;
  etapaAtualText: string;
  etapaStatusText: string;
  files?: any;
  id: number;
  superiorDiretor?: any;
  superiorDiretorId?: string;
  titulo: string;
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
