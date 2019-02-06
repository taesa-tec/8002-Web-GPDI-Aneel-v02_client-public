import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralAdministrativaComponent } from './central-administrativa.component';

describe('CentralAdministrativaComponent', () => {
  let component: CentralAdministrativaComponent;
  let fixture: ComponentFixture<CentralAdministrativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralAdministrativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
