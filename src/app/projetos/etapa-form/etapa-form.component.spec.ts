import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaFormComponent } from './etapa-form.component';

describe('EtapaFormComponent', () => {
  let component: EtapaFormComponent;
  let fixture: ComponentFixture<EtapaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
