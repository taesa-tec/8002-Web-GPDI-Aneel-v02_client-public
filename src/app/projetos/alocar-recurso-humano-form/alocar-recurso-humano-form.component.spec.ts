import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocarRecursoHumanoFormComponent } from './alocar-recurso-humano-form.component';

describe('AlocarRecursoHumanoFormComponent', () => {
  let component: AlocarRecursoHumanoFormComponent;
  let fixture: ComponentFixture<AlocarRecursoHumanoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlocarRecursoHumanoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocarRecursoHumanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
