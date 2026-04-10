import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterLeave } from './enter-leave';

describe('EnterLeave', () => {
  let component: EnterLeave;
  let fixture: ComponentFixture<EnterLeave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterLeave],
    }).compileComponents();

    fixture = TestBed.createComponent(EnterLeave);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
