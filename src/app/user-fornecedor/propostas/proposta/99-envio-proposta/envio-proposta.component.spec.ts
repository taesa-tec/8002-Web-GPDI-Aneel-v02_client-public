import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioPropostaComponent } from './envio-proposta.component';

describe('EnvioPropostaComponent', () => {
  let component: EnvioPropostaComponent;
  let fixture: ComponentFixture<EnvioPropostaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioPropostaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioPropostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
