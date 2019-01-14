import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocacaoRecursosMateriaisComponent } from './alocacao-recursos-materiais.component';

describe('AlocacaoRecursosMateriaisComponent', () => {
  let component: AlocacaoRecursosMateriaisComponent;
  let fixture: ComponentFixture<AlocacaoRecursosMateriaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlocacaoRecursosMateriaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocacaoRecursosMateriaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
