import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogEditProdComponent } from './dailog-edit-prod.component';

describe('DailogEditProdComponent', () => {
  let component: DailogEditProdComponent;
  let fixture: ComponentFixture<DailogEditProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailogEditProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailogEditProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
