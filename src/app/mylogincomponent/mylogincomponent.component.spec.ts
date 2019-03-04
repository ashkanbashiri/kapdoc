import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MylogincomponentComponent } from './mylogincomponent.component';

describe('MylogincomponentComponent', () => {
  let component: MylogincomponentComponent;
  let fixture: ComponentFixture<MylogincomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MylogincomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MylogincomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
