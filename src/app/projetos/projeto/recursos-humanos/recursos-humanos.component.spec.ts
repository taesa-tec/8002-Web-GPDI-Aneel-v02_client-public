import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosHumanosComponent } from './recursos-humanos.component';

describe('RecursosHumanosComponent', () => {
  let component: RecursosHumanosComponent;
  let fixture: ComponentFixture<RecursosHumanosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosHumanosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosHumanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
