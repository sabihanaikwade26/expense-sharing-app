import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTrips } from './member-trips';

describe('MemberTrips', () => {
  let component: MemberTrips;
  let fixture: ComponentFixture<MemberTrips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberTrips],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberTrips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
