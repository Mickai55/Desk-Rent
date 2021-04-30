import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRentRequestComponent } from './send-rent-request.component';

describe('SendRentRequestComponent', () => {
  let component: SendRentRequestComponent;
  let fixture: ComponentFixture<SendRentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendRentRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
