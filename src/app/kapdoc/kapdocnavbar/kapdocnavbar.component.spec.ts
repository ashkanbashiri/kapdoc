import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KapdocnavbarComponent } from './kapdocnavbar.component';

describe('KapdocnavbarComponent', () => {
  let component: KapdocnavbarComponent;
  let fixture: ComponentFixture<KapdocnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KapdocnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KapdocnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
