import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRobotStateComponent } from './change-robot-statecomponent';

describe('ActivateRobotComponent', () => {
  let component: ChangeRobotStateComponent;
  let fixture: ComponentFixture<ChangeRobotStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeRobotStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeRobotStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
