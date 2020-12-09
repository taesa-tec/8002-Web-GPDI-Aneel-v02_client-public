import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, forwardRef, Input} from '@angular/core';
import {CatalogsService} from '@app/services/catalogs.service';
import {AppService} from '@app/services/app.service';
import {ActivatedRoute} from '@angular/router';
import {ProjetosService} from '@app/services/projetos.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {zip, of} from 'rxjs';
import {Projeto, Tema, SubTema, SubTemaRequest, TemaProjeto, NoRequest, ResultadoResponse, CatalogTema, NiveisUsuarios} from '@app/models';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {LoadingComponent} from '@app/core/components/loading/loading.component';

@Component({
  selector: 'app-form-editor-temas',
  templateUrl: './temas.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemasComponent),
      multi: true
    }
  ]
})
export class TemasComponent implements OnInit, ControlValueAccessor {


  projeto: Projeto;

  temaProjeto: TemaProjeto;

  temas: Array<CatalogTema>;
  // Form
  temaControl = new FormControl('', [Validators.required]);
  subTemasForms = new FormArray([]);
  form: FormGroup = this.builder.group({
    catalogTemaId: '',
    outroDesc: '',
    subTemas: this.subTemasForms
  });

  @ViewChild(LoadingComponent, { static: true }) loading;
  @ViewChild('file') file: ElementRef;
  @Input() readonly = false;

  get value() {
    return this.form.value;
  }

  set value(val) {
    if (this.form) {
      this.form.patchValue(val);
      if (val.subTemas) {
        val.subTemas.forEach(v => this.addSubTema(v));
        this.subTemasForms.updateValueAndValidity();
      }
    }
    this.onChange(val);
    this.onTouched();
  }

  get tema() {
    return this.temas ? this.temas.find(t => t.id === parseFloat(this.form.value.catalogTemaId)) : null;
  }

  get temaValor(): string {
    return this.tema ? this.tema.valor : '';
  }

  get subTemas() {
    return this.tema ? this.tema.subTemas : [];
  }


  get selectedsThemes() {
    return (this.subTemasForms.value as Array<any>).map(i => parseInt(i.catalogSubTemaId, 10));
  }

  constructor(
    private app: AppService,
    protected builder: FormBuilder,
    private route: ActivatedRoute,
    private projetoService: ProjetosService,
    protected catalogo: CatalogsService) {
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  subtemasdisponiveis(current?: any) {
    return this.subTemas.filter(tema => {
      return this.selectedsThemes.indexOf(tema.subTemaId) === -1 || (current && parseFloat(current) === tema.subTemaId);
    });
  }

  isOther(subTemaId) {
    const subtema = this.subTemas ? this.subTemas.find(st => st.subTemaId === parseInt(subTemaId, 10)) : null;
    return subtema && subtema.nome.match(/^Outros?\.?$/g) !== null;
  }

  async ngOnInit() {
    this.loading.show();
    this.temas = await this.catalogo.temas().toPromise();
    this.load();
    this.loading.hide();
  }

  async load() {
    this.setupForm();
  }


  protected setupForm() {
    this.temaControl.valueChanges.subscribe(value => {
      if (this.tema && this.tema.valor === 'OU') {
        this.form.addControl('outroDesc', new FormControl('', [Validators.required]));
      } else {
        this.form.removeControl('outroDesc');
      }
      this.reset();
    });

    this.form.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });
  }

  protected reset(keepOne = true) {
    // this.subTemasForms.reset();
    while (this.subTemasForms.length > 0) {
      this.subTemasForms.removeAt(0);
    }
    if (this.tema && keepOne) {
      this.addSubTema();
    }
  }

  addSubTema(subtema?: SubTema) {

    const id = subtema ? subtema.catalogSubTemaId || '' : '';
    const outroDesc = subtema ? subtema.outroDesc || '' : '';

    const f = new FormGroup({
      catalogSubTemaId: new FormControl(id, [Validators.required]),
      outroDesc: new FormControl(outroDesc)
    });
    this.subTemasForms.push(f);
    this.form.updateValueAndValidity();
  }

  delete(i: number) {
    if (this.subTemasForms.length > 1) {
      this.subTemasForms.removeAt(i);
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean) {
    if (state) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

}
