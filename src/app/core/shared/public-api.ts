export * from './shared.module';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from '../../../../../ckeditor5/packages/ckeditor5-build-classic/build/ckeditor.js';

export {ClassicEditor};
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
    //'placeholder'
  ],
  //*/
};
