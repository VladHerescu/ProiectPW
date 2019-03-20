import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProbabilityComponent } from './admin-probability.component';

describe('AdminProbabilityComponent', () => {
  let component: AdminProbabilityComponent;
  let fixture: ComponentFixture<AdminProbabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProbabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProbabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
