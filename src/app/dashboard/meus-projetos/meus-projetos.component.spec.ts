import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusProjetosComponent } from './meus-projetos.component';

describe('MeusProjetosComponent', () => {
  let component: MeusProjetosComponent;
  let fixture: ComponentFixture<MeusProjetosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusProjetosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
