import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipProposalComponent } from './scholarship-proposal.component';

describe('ScholarshipProposalComponent', () => {
  let component: ScholarshipProposalComponent;
  let fixture: ComponentFixture<ScholarshipProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarshipProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarshipProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
