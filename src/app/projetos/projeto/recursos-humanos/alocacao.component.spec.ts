import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocacaoComponent } from './alocacao.component';

describe('AlocacaoComponent', () => {
  let component: AlocacaoComponent;
  let fixture: ComponentFixture<AlocacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlocacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
