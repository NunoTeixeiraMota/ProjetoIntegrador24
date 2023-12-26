import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Building from 'src/app/model/building';
import Floor from 'src/app/model/floor';
import { CreateVigilanceTaskComponent } from './create-task-vigilance.component';
import { TaskService } from 'src/app/service/Task/task.service';
import taskVigilance from 'src/app/model/taskVigilance';

describe('CreateVigilanceTaskComponent', () => {
  let component: CreateVigilanceTaskComponent;
  let fixture: ComponentFixture<CreateVigilanceTaskComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateVigilanceTaskComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [TaskService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVigilanceTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    taskService = TestBed.inject(TaskService);
  });

  const mockBuilding: Building = {
    _id: "1",
    name: 'a',
    localizationoncampus: 'a',
    floors: 1,
    lifts: 1,
    maxCel: [1, 1]
  }

  const mockFloor: Floor = {
    _id: "2",
    name: 'a',
    building: mockBuilding,
    description: 'a',
    hall: 'a',
    room: 2,
    floorMap: 'aaaa',
    hasElevator: true,
    passages: []
  }

  const mockTask: taskVigilance = {
    userEmail: "aaaa@gmail.com",
    floor: "2",
    description:"aaaaa",
    phoneNumber: "999999999"
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default task values', () => {
    expect(component.task).toEqual({
      userEmail:"",
      floor: "",
      description: "",
      phoneNumber:""
    });
  });

  it('should call createRoom and return room data', () => {
    spyOn(taskService, 'vigilance').and.returnValue(of(mockTask));
    taskService.vigilance(component.task);
    expect(taskService.vigilance).toHaveBeenCalledWith(component.task);
  });

  it('should handle error on createRoom', () => {
    spyOn(taskService, 'vigilance').and.returnValue(throwError(() => new Error('Error')));
    component.createTask();
  });
});
