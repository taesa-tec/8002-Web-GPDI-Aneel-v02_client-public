import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorioXmlComponent } from './repositorio-xml.component';

describe('RepositorioXmlComponent', () => {
  let component: RepositorioXmlComponent;
  let fixture: ComponentFixture<RepositorioXmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositorioXmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorioXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
