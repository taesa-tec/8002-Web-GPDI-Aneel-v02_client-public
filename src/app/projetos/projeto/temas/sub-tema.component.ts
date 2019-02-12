import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubTema, CatalogSubTema } from '@app/models';

@Component({
    selector: 'app-sub-tema',
    templateUrl: './sub-tema.component.html',
    styles: [],
})
export class SubTemasComponent implements OnInit {


    @Input() subTemas: CatalogSubTema[] = [];
    @Input() selectedThemes: Array<number> = [];
    @Input() subform: FormGroup;
    @Input() index: number;
    @Output() remove: EventEmitter<void> = new EventEmitter();


    get temas() {
        return this.subTemas.filter(tema => {
            return this.selectedThemes.indexOf(tema.subTemaId) === -1 || (this.tema && this.tema.subTemaId === tema.subTemaId);
        });
    }
    get temaControl() {
        return this.subform.get('catalogSubTemaId');
    }
    get tema() {
        return this.subTemas ? this.subTemas.find(t => t.subTemaId === parseInt(this.temaControl.value, 10)) : null;
    }

    get isOther() {
        return this.tema && this.tema.nome.match(/^Outro\.?$/g) !== null;
    }
    constructor() { }

    ngOnInit(): void {
        // this.setup();

        this.temaControl.valueChanges.subscribe(value => {
            this.setup();
        });
    }

    protected setup() {
        if (this.isOther) {
            this.subform.addControl('outroDesc', new FormControl('', [Validators.required]));
        } else {
            this.subform.removeControl('outroDesc');
        }
        this.subform.updateValueAndValidity();
    }

    delete() {
        this.remove.emit();
    }
}
