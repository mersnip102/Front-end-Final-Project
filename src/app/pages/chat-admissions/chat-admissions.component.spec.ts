import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAdmissionsComponent } from './chat-admissions.component';

describe('ChatAdmissionsComponent', () => {
  let component: ChatAdmissionsComponent;
  let fixture: ComponentFixture<ChatAdmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatAdmissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAdmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
