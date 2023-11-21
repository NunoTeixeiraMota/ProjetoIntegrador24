import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { of, throwError } from 'rxjs';
import { CreateRobotTypeComponent } from './create-robot-type.component';
import robotType from 'src/app/model/robotType';

describe('CreateRobotTypeComponent', () => {
  let component: CreateRobotTypeComponent;
  let fixture: ComponentFixture<CreateRobotTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CreateRobotTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRobotTypeComponent);
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
      id: "1",
      designation: "a",
      brand: "a",
      modelRobot: "a",
      task: 0
  };

    const fakeService = jasmine.createSpyObj('RobotService', ['createRobot']);
    fakeService.createRobot.and.returnValue(of({
      data: {
        status:200,
        body: rt
      },

      error: {
        status: 404,
      }
    }));

    component = new CreateRobotTypeComponent(fakeLocation,fakeService,fakeMessageService);
    component.robotType.id = "1";
    component.robotType.designation = "a";
    component.robotType.brand = "a";
    component.robotType.modelRobot = "a";
    component.robotType.task = 0;

    component.createRobotType();

    expect(fakeService.createRobotType).toHaveBeenCalled();
    expect(component.finalMessage).toBe("Success robot type creation!");
  })

  it('should fail creation', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('RoomService', ['createRoom']);
    fakeService.createRoom.and.returnValue(throwError({
      error: {
        status: 400,
        message: "error"
      }
    }));

    component = new CreateRobotTypeComponent(fakeLocation,fakeService,fakeMessageService);

    component.createRobotType();

    expect(fakeService.createRobotType).toHaveBeenCalled();
    expect(component.finalMessage).toBe("error");
  })
});
