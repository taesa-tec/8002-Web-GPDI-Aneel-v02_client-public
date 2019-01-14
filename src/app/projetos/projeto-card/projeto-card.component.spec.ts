import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoCardComponent } from './projeto-card.component';

describe('ProjetoCardComponent', () => {
  let component: ProjetoCardComponent;
  let fixture: ComponentFixture<ProjetoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
