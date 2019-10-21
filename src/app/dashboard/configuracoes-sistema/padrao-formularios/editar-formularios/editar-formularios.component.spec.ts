import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFormulariosComponent } from './editar-formularios.component';

describe('EditarFormulariosComponent', () => {
  let component: EditarFormulariosComponent;
  let fixture: ComponentFixture<EditarFormulariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarFormulariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
