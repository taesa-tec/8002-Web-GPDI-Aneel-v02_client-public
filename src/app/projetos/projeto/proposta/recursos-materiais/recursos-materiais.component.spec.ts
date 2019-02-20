import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosMateriaisComponent } from './recursos-materiais.component';

describe('RecursosMateriaisComponent', () => {
  let component: RecursosMateriaisComponent;
  let fixture: ComponentFixture<RecursosMateriaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosMateriaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosMateriaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
