import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocacaoRecursosHumanosComponent } from './alocacao-recursos-humanos.component';

describe('AlocacaoRecursosHumanosComponent', () => {
  let component: AlocacaoRecursosHumanosComponent;
  let fixture: ComponentFixture<AlocacaoRecursosHumanosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlocacaoRecursosHumanosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocacaoRecursosHumanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
