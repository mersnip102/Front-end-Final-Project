import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementScholarshipComponent } from './management-scholarship.component';

describe('ManagementScholarshipComponent', () => {
  let component: ManagementScholarshipComponent;
  let fixture: ComponentFixture<ManagementScholarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementScholarshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementScholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
