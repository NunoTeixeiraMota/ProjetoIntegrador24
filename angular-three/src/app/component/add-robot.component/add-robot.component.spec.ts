import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';
import { MessageService } from 'src/app/service/message/message.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import Robot from 'src/app/model/robot';
import robotType from 'src/app/model/robotType';
import { AddRobotComponent } from './add-robot.component';

describe('AddRobotComponent', () => {
  let component: AddRobotComponent;
  let fixture: ComponentFixture<AddRobotComponent>;
  let robotServiceSpy: jasmine.SpyObj<RobotService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  

  beforeEach(async () => {
    robotServiceSpy = jasmine.createSpyObj('RobotService', ['changerobotState']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [AddRobotComponent],
      imports: [FormsModule],
      providers: [
        { provide: RobotService, useValue: robotServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockrobotType: robotType = {
    _id: "1",
    designation: "Tractor",
    brand: "LG",
    modelRobot: "modelRobot",
    task: 0,
  };

  const mockRobot: Robot = {
    id: '1',
    nickname: 'Test Robot',
    type: mockrobotType,
    serialNumber: '12345',
    description: 'Test Description',
    isActive: true
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set finalMessage to success message on successful add robot', () => {
    robotServiceSpy.addRobot.and.returnValue(of(mockRobot));
    component.addRobot();
    expect(component.finalMessage).toBe("Robot added with success!");
    expect(messageServiceSpy.add).toHaveBeenCalledWith("Robot added with success!");
  });
  
  it('should set finalMessage to error message on failed robot state change', () => {
    const errorMessage = { error: { message: 'Error adding robot' } };
    robotServiceSpy.addRobot.and.returnValue(throwError(() => errorMessage));
    component.addRobot();
    expect(component.finalMessage).toBe(errorMessage.error.message);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(errorMessage.error.message);
  });
});