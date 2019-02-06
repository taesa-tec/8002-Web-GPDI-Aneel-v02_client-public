import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeracaoXmlComponent } from './geracao-xml.component';

describe('GeracaoXmlComponent', () => {
  let component: GeracaoXmlComponent;
  let fixture: ComponentFixture<GeracaoXmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeracaoXmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeracaoXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
