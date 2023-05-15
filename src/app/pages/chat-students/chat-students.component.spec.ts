import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatStudentsComponent } from './chat-students.component';

describe('ChatStudentsComponent', () => {
  let component: ChatStudentsComponent;
  let fixture: ComponentFixture<ChatStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
