import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsDutoComponent } from './logs-duto.component';

describe('LogsDutoComponent', () => {
  let component: LogsDutoComponent;
  let fixture: ComponentFixture<LogsDutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsDutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsDutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
