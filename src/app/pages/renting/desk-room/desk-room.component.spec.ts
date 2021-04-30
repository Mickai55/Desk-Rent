import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskRoomComponent } from './desk-room.component';

describe('DeskRoomComponent', () => {
  let component: DeskRoomComponent;
  let fixture: ComponentFixture<DeskRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
