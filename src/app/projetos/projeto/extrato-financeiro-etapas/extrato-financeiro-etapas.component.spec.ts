import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoFinanceiroEtapasComponent } from './extrato-financeiro-etapas.component';

describe('ExtratoFinanceiroEtapasComponent', () => {
  let component: ExtratoFinanceiroEtapasComponent;
  let fixture: ComponentFixture<ExtratoFinanceiroEtapasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtratoFinanceiroEtapasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratoFinanceiroEtapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
