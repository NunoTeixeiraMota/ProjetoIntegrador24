import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { of, throwError } from 'rxjs';
import { EditFloorComponent } from './edit-floor.component';
import floor from 'src/app/model/floor';
import Building from 'src/app/model/building';

describe('EditFloorComponent', () => {
  let component: EditFloorComponent;
  let fixture: ComponentFixture<EditFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ EditFloorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be successful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    let building: Building = {
        id: "1",
        name: 'a',
        localizationoncampus: 'a',
        floors: 0,
        lifts: 0,
        maxCel: [5000]
      };

    let floor: floor = {
        id: "1",
        name: 'a',
        building: building,
        description: 'a',
        hall: 'a',
        room: 2,
        floorMap: 'a',
        hasElevator: false,
        passages: []
      };

    const fakeService = jasmine.createSpyObj('FloorService', ['editFloor']);
    fakeService.editFloor.and.returnValue(of({
      data: {
        status:200,
        body: floor
      },

      error: {
        status: 404,
      }
    }));

    component = new EditFloorComponent(fakeLocation,fakeService,fakeMessageService);
    component.floor.id = "1";
    component.floor.name = "a";
    component.floor.building = "1";
    component.floor.description = "a";
    component.floor.hall = "a";
    component.floor.room = 2;
    component.floor.floorMap = "a";
    component.floor.hasElevator = false;
    component.floor.passages = "";

    component.editFloor();

    expect(fakeService.createRobot).toHaveBeenCalled();
    expect(component.finalMessage).toBe("Floor edited with success!");
  })

  it('should fail creation', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('FloorService', ['editRoom']);
    fakeService.editFloor.and.returnValue(throwError({
      error: {
        status: 400,
        message: "error"
      }
    }));

    component = new EditFloorComponent(fakeLocation,fakeService,fakeMessageService);

    component.editFloor();

    expect(fakeService.editFloor).toHaveBeenCalled();
    expect(component.finalMessage).toBe("error");
  })
});
