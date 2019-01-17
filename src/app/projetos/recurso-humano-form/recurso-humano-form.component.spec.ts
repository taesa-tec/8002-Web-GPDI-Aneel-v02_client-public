import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoHumanoFormComponent } from './recurso-humano-form.component';

describe('RecursoHumanoFormComponent', () => {
  let component: RecursoHumanoFormComponent;
  let fixture: ComponentFixture<RecursoHumanoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursoHumanoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoHumanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
