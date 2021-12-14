import {InjectionToken, Provider} from '@angular/core';

export * from './shared.module';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import * as ClassicEditor from '@projects/ckeditor/build/ckeditor';

//export {ClassicEditor};
export const ConfigEditor = {
  language: 'pt-br',
  height: 300,
  extraPlugins: [],
  removePlugins: [],
  uiColor: '#E8E4E4',
  resize_enabled: false,
  toolbar: [
    'undo',
    'redo',
    'heading',
    'alignment',
    '|',
    'bold',
    'italic',
    'underline',
    'subscript',
    'superscript',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'blockQuote',
    'insertTable',
    //'|',
    //'uploadImage',
    //'placeholder'
  ],
  //*/
};

export const COMPONENT_LABELS = new InjectionToken<Map<string, string>>('Textos usados no componente');
export const PERMISSIONS = new InjectionToken<Map<string, any>>('Permissões');

export function ProvidePermissions(...permisions: string[]): Provider {
  return {
    provide: PERMISSIONS,
    multi: true,
    useValue: new Map(permisions.map(p => [p, true]))
  };
}
