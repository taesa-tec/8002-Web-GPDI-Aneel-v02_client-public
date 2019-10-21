import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAprovacaoComponent } from './pre-aprovacao.component';

describe('PreAprovacaoComponent', () => {
  let component: PreAprovacaoComponent;
  let fixture: ComponentFixture<PreAprovacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreAprovacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreAprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
