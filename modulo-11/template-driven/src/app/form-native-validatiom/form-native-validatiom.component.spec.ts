import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNativeValidatiomComponent } from './form-native-validatiom.component';

describe('FormNativeValidatiomComponent', () => {
  let component: FormNativeValidatiomComponent;
  let fixture: ComponentFixture<FormNativeValidatiomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNativeValidatiomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNativeValidatiomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
