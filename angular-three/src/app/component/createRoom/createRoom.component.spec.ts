import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { of, throwError } from 'rxjs';
import { RoomCreateComponent } from './createRoom.component';
import { RoomCategory } from 'src/app/model/room';
import Room from 'src/app/model/room';

describe('RoomCreateComponent', () => {
  let component: RoomCreateComponent;
  let fixture: ComponentFixture<RoomCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ RoomCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be successful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    let room: Room = {
        id: "1",
        building: {id: "2",name: "a",localizationoncampus: "a",floors: 2,lifts: 2,maxCel: [2, 2],floorOnBuilding: []},
        floor: {id: "3",name: "a",description: "a",hall: "a",room: 3,floorMap: "a",hasElevator: true,passages: []},
        name: "a",
        category: RoomCategory.Gabinete,
        description: "a",
        dimension: [2, 2]
    };

    const fakeService = jasmine.createSpyObj('RoomService', ['createRoom']);
    fakeService.createRoom.and.returnValue(of({
      data: {
        status:200,
        body: room
      },

      error: {
        status: 404,
      }
    }));

    component = new RoomCreateComponent(fakeLocation,fakeService,fakeMessageService);

    component.room.id = "1";
    component.room.building = {id: "2",name: "a",localizationoncampus: "a",floors: 2,lifts: 2,maxCel: [2, 2],floorOnBuilding: []};
    component.room.floor = {id: "3",name: "a",description: "a",hall: "a",room: 3,floorMap: "a",hasElevator: true,passages: []};
    component.room.name = "a";
    component.room.category = RoomCategory.Gabinete;
    component.room.description = "a";
    component.room.dimension = [2, 2];

    component.createRoom();

    expect(fakeService.createWarehouse).toHaveBeenCalled();
    expect(component.finalMessage).toBe("Success warehouse creation!");
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

    component = new RoomCreateComponent(fakeLocation,fakeService,fakeMessageService);

    component.createRoom();

    expect(fakeService.createWarehouse).toHaveBeenCalled();
    expect(component.finalMessage).toBe("error");
  })
});
