import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuCadastroComponent } from './meu-cadastro.component';

describe('MeuCadastroComponent', () => {
  let component: MeuCadastroComponent;
  let fixture: ComponentFixture<MeuCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeuCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
