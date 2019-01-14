import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoFinanceiroEmpresaComponent } from './extrato-financeiro-empresa.component';

describe('ExtratoFinanceiroEmpresaComponent', () => {
  let component: ExtratoFinanceiroEmpresaComponent;
  let fixture: ComponentFixture<ExtratoFinanceiroEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtratoFinanceiroEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratoFinanceiroEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
