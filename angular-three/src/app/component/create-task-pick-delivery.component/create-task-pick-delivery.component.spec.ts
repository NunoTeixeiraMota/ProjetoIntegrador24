import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Building from 'src/app/model/building';
import Floor from 'src/app/model/floor';
import { TaskService } from 'src/app/service/Task/task.service';
import { CreateTaskPickDeliveryComponent } from './create-task-pick-delivery.component';
import taskPickDelivery from 'src/app/model/taskPickDelivery';

describe('CreateTaskPickDeliveryComponent', () => {
  let component: CreateTaskPickDeliveryComponent;
  let fixture: ComponentFixture<CreateTaskPickDeliveryComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTaskPickDeliveryComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [TaskService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskPickDeliveryComponent);
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

  const mockTask: taskPickDelivery = {
    userEmail: "aaaa@gmail.com",
    namePickup: "aaaa",
    nameDelivery: "aaa",
    codeDelivery: 11111,
    floor: "2",
    room: ["2"],
    description: "aaaaa"
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default task values', () => {
    expect(component.task).toEqual({
      userEmail: "",
      namePickup: "",
      nameDelivery: "",
      codeDelivery: 0,
      floor: "",
      room: [""],
      description: ""
    });
  });

  it('should call createTaskPickDelivery and return task data', () => {
    spyOn(taskService, 'pickDelivery').and.returnValue(of(mockTask));
    taskService.pickDelivery(component.task);
    expect(taskService.pickDelivery).toHaveBeenCalledWith(component.task);
  });

  it('should handle error on createTaskPickDelivery', () => {
    spyOn(taskService, 'pickDelivery').and.returnValue(throwError(() => new Error('Error')));
    component.createTask();
  });
});
