import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeskRoomComponent } from './create-desk-room.component';

describe('CreateDeskRoomComponent', () => {
  let component: CreateDeskRoomComponent;
  let fixture: ComponentFixture<CreateDeskRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDeskRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeskRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
