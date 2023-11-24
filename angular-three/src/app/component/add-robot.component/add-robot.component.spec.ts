import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { of, throwError } from 'rxjs';
import robotType from 'src/app/model/robotType';
import robot from 'src/app/model/robot';
import { AddRobotComponent } from './add-robot.component';

describe('AddRobotComponent', () => {
  let component: AddRobotComponent;
  let fixture: ComponentFixture<AddRobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AddRobotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be successful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);
  
    let rt: robotType = {
      _id: "1",
      designation: "a",
      brand: "a",
      modelRobot: "a",
      task: 0
    };
  
    let robot: robot = {
      id: "1",
      nickname: 'a',
      type: rt,
      serialNumber: "a",
      description: "a",
      isActive: true
    };
  
    const fakeService = jasmine.createSpyObj('RobotService', ['addRobot']);
    fakeService.addRobot.and.returnValue(of({
      data: {
        status: 200,
        body: rt
      },
  
      error: {
        status: 404,
      }
    }));
  
    component = new AddRobotComponent(fakeLocation, fakeService, fakeMessageService);
    component.robot.nickname = "a";
    component.robot.type = "1";
    component.robot.serialNumber = "a";
    component.robot.description = "a";
    component.robot.isActive = true;
  
    component.addRobot();
  
    expect(fakeService.addRobot).toHaveBeenCalled();
    expect(component.finalMessage).toBe("Robot added with success!");
  });
  
  it('should fail creation', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);
  
    const fakeService = jasmine.createSpyObj('RobotService', ['addRobot']);
    fakeService.addRobot.and.returnValue(throwError({
      error: {
        status: 400,
        message: "error"
      }
    }));
  
    component = new AddRobotComponent(fakeLocation, fakeService, fakeMessageService);
  
    component.addRobot();
  
    expect(fakeService.addRobot).toHaveBeenCalled();
    expect(component.finalMessage).toBe("error");
  });  
});
