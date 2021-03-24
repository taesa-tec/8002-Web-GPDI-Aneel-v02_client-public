import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ContratoPlaceholderEditing from './contrato-placeholder-editing';
import ContratoPlaceholderUi from './contrato-placeholder-ui';

export default class ContratoPlaceholder extends Plugin{

    static get requires(){
        return [ContratoPlaceholderEditing, ContratoPlaceholderUi]
    }
}