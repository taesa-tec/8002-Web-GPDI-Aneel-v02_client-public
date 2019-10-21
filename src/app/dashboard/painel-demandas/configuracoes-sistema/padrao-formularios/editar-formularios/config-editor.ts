import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
export const CONFIG = {
    language: "pt-br",
    height: 200,
    extraPlugins: "copyformatting,colorbutton",
    removePlugins: "elementspath",
    uiColor: "#E8E4E4",
    resize_enabled: false,
    toolbarGroups: [
        {
            "name": "basicstyles",
            "groups": ["basicstyles"]
        },
        {
            "name": "clipboard",
            "groups": ["clipboard", "undo"]
        },
        {
            "name": "links",
            "groups": ["links"]
        },
        {
            "name": "paragraph",
            "groups": ["list", "blocks"]
        },
        {
            "name": "document",
            "groups": ["mode"]
        },
        {
            "name": "insert",
            "groups": ["insert"]
        },
        {
            "name": "styles",
            "groups": ["styles"]
        },
        {
            "name": "colors",
            "groups": ["colors"]
        },
        {
            "name": "editing",
            "groups": ["find", "selection", "spellchecker", "editing"]
        },
        {
            "name": "links",
            "groups": ["links"]
        },
        {
            "name": "insert",
            "groups": ["insert"]
        },
        {
            "name": "forms",
            "groups": ["forms"]
        },
        {
            "name": "tools",
            "groups": ["tools"]
        },
        {
            "name": "document",
            "groups": ["mode", "document", "doctools"]
        },
        {
            "name": "others",
            "groups": ["others"]
        },
        {
            "name": "basicstyles",
            "groups": ["basicstyles", "cleanup"]
        },
        {
            "name": "paragraph",
            "groups": ["list", "indent", "blocks", "align", "bidi", "paragraph"]
        },
        {
            "name": "styles",
            "groups": ["styles"]
        },
        {
            "name": "about",
            "groups": ["about"]
        },
    ],
}

export interface FormularioEditor {
    label: string;
    form?: AbstractControl;
    children?: Array<FormularioEditor>;
}

const teste: FormularioEditor[] = [
    // 1. APRESENTAÇÃO E OBJETIVO
    {
        label: "APRESENTAÇÃO E OBJETIVO",
        form: new FormGroup({ qualquercampo: new FormControl("") })
    },
    // 2. ESCOPO DE FORNECIMENTO
    {
        label: "ESCOPO DE FORNECIMENTO",
        form: null,
        children: [
            {
                label: "TEMA ANEEL",
                form: new FormGroup({ qualquercampo: new FormControl("") })
            }
        ]
    }
]

