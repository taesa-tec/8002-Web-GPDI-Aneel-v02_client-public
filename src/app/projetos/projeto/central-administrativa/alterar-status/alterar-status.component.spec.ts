import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarStatusComponent } from './alterar-status.component';

describe('AlterarStatusComponent', () => {
  let component: AlterarStatusComponent;
  let fixture: ComponentFixture<AlterarStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
