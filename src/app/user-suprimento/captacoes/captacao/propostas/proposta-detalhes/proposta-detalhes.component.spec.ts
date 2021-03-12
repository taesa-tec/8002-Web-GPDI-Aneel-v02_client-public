import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaDetalhesComponent } from './proposta-detalhes.component';

describe('PropostaDetalhesComponent', () => {
  let component: PropostaDetalhesComponent;
  let fixture: ComponentFixture<PropostaDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
