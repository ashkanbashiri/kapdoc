import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunpageComponent } from './funpage.component';

describe('FunpageComponent', () => {
  let component: FunpageComponent;
  let fixture: ComponentFixture<FunpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
