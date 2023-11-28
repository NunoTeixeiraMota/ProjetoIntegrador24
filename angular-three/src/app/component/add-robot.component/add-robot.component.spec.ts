import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AddRobotComponent } from './add-robot.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddRobotComponent', () => {
  let component: AddRobotComponent;
  let fixture: ComponentFixture<AddRobotComponent>;
  let robotService: RobotService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRobotComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [RobotService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(AddRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    robotService = TestBed.inject(RobotService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default robot values', () => {
    expect(component.robot).toEqual({
      nickname: '',
      type: '',
      serialNumber: '',
      description: '',
      isActive: true
    });
  });

  it('should call addRobot and return robot data', () => {
    const response = { message: 'Robot added with success!' };
    spyOn(robotService, 'addRobot').and.returnValue(of(response));
    robotService.addRobot(component.robot);
    expect(robotService.addRobot).toHaveBeenCalledWith(component.robot);
  });

  it('should handle error on addRobot', () => {
    spyOn(robotService, 'addRobot').and.returnValue(throwError(() => new Error('Error')));
    component.addRobot();
  });
});