import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoFinanceiroEmpresasComponent } from './extrato-financeiro-empresas.component';

describe('ExtratoFinanceiroEmpresasComponent', () => {
  let component: ExtratoFinanceiroEmpresasComponent;
  let fixture: ComponentFixture<ExtratoFinanceiroEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtratoFinanceiroEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratoFinanceiroEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
