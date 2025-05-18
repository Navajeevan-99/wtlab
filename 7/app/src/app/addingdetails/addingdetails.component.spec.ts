import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingdetailsComponent } from './addingdetails.component';

describe('AddingdetailsComponent', () => {
  let component: AddingdetailsComponent;
  let fixture: ComponentFixture<AddingdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
