import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateRobotComponent } from './activate-robot.component';

describe('ActivateRobotComponent', () => {
  let component: ActivateRobotComponent;
  let fixture: ComponentFixture<ActivateRobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateRobotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivateRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
