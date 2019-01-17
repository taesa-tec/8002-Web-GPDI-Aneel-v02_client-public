import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoMaterialFormComponent } from './recurso-material-form.component';

describe('RecursoMaterialFormComponent', () => {
  let component: RecursoMaterialFormComponent;
  let fixture: ComponentFixture<RecursoMaterialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursoMaterialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoMaterialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
