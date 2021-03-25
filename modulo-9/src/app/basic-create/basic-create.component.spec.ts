import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCreateComponent } from './basic-create.component';

describe('BasicCreateComponent', () => {
  let component: BasicCreateComponent;
  let fixture: ComponentFixture<BasicCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
