import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormValidComponent } from './reactive-form-valid.component';

describe('ReactiveFormValidComponent', () => {
  let component: ReactiveFormValidComponent;
  let fixture: ComponentFixture<ReactiveFormValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormValidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
