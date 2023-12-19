import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeRobotStateComponent } from './change-robot-statecomponent';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';
import { MessageService } from 'src/app/service/message/message.service';
import { of, throwError } from 'rxjs';
import Robot from 'src/app/model/robot';
import { FormsModule } from '@angular/forms';


describe('ChangeRobotStateComponent', () => {
  let component: ChangeRobotStateComponent;
  let fixture: ComponentFixture<ChangeRobotStateComponent>;
  let robotServiceMock: any;
  let messageServiceMock: any;

  const mockRobots: Robot[] = [
    {
      id: '1',
      nickname: 'TestRobot',
      type: {
        _id: 'type1',
        designation: 'Utility',
        brand: 'BrandA',
        modelRobot: 'ModelX',
        task: 0 // Assuming 0 for vigilance
      },
      serialNumber: 'SN123456',
      description: 'Test Description',
      isActive: true
    }
    // Add more mock robots if necessary
  ];

  beforeEach(() => {
    robotServiceMock = {
      getActiveRobots: jasmine.createSpy('getActiveRobots').and.returnValue(of([])), // Mock with empty array initially
      changerobotState: jasmine.createSpy('changerobotState').and.returnValue(of({}))
    };

    messageServiceMock = {
      add: jasmine.createSpy('add')
    };

    TestBed.configureTestingModule({
      declarations: [ ChangeRobotStateComponent ],
      imports: [FormsModule],
      providers: [
        { provide: RobotService, useValue: robotServiceMock },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    });

    fixture = TestBed.createComponent(ChangeRobotStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getActiveRobots on initialization', () => {
    expect(robotServiceMock.getActiveRobots).toHaveBeenCalled();
  });

  it('should update active robots from service', () => {
    robotServiceMock.getActiveRobots.and.returnValue(of(mockRobots));
    component.getActiveRobots();
    expect(component.activeRobots).toEqual(mockRobots);
  });

  it('should handle error when fetching active robots fails', () => {
    const errorResponse = { error: { message: 'Server Error' }, code: 500 };
    robotServiceMock.getActiveRobots.and.returnValue(throwError(errorResponse));
    component.getActiveRobots();
    expect(component.finalMessage).toBe(errorResponse.error.message);
  });

  it('should call changerobotState and handle success response', () => {
    const mockRobot = mockRobots[0]; // Use the first robot in mock data
    component.id = mockRobot.id.toString(); // Ensure id is a string
    robotServiceMock.changerobotState.and.returnValue(of(mockRobot));
    component.changeRobotState();
    expect(robotServiceMock.changerobotState).toHaveBeenCalledWith(component.id);
    expect(messageServiceMock.add).toHaveBeenCalledWith(`Robot State changed with success! Robot Details: Name :${mockRobot.nickname} STATE : ${mockRobot.isActive}`);
  });
  

  // Add more tests as necessary
});
