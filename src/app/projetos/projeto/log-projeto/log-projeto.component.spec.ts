import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogProjetoComponent } from './log-projeto.component';

describe('LogProjetoComponent', () => {
  let component: LogProjetoComponent;
  let fixture: ComponentFixture<LogProjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogProjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
