import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocarRecursoMaterialFormComponent } from './alocar-recurso-material-form.component';

describe('AlocarRecursoMaterialFormComponent', () => {
  let component: AlocarRecursoMaterialFormComponent;
  let fixture: ComponentFixture<AlocarRecursoMaterialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlocarRecursoMaterialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocarRecursoMaterialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
