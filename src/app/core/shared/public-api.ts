import {InjectionToken} from '@angular/core';

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
    '|',
    'bold',
    'italic',
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
