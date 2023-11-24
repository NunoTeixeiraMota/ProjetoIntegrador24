import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { of, throwError } from 'rxjs';
import { CreateRoomComponent } from './create-room.component';
import { RoomCategory } from 'src/app/model/room';
import Room from 'src/app/model/room';
import { FloorService } from 'src/app/service/Floor/floor.service';

describe('CreateRoomComponent', () => {
  let component: CreateRoomComponent;
  let fixture: ComponentFixture<CreateRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CreateRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be successful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);
    let fakeFloorService = TestBed.inject(FloorService);

    let room: Room = {
        id: "1",
        floor: {_id: "3",name: "a",building: {_id: "2",name: "a",localizationoncampus: "a",floors: 2,lifts: 2,maxCel: [2, 2]},description: "a",hall: "a",room: 3,floorMap: "a",hasElevator: true,passages: []},
        name: "a",
        category: RoomCategory.Gabinete,
        description: "a",
        dimension: [2, 2]
    };

    const fakeRoomService = jasmine.createSpyObj('RoomService', ['createRoom']);
    fakeRoomService.createRoom.and.returnValue(of({
      data: {
        status:200,
        body: room
      },

      error: {
        status: 404,
      }
    }));

    component = new CreateRoomComponent(fakeLocation,fakeRoomService,fakeFloorService,fakeMessageService);

    component.room.floor = "3";
    component.room.name = "a";
    component.room.category = RoomCategory.Gabinete;
    component.room.description = "a";
    component.room.dimension = [2, 2];

    component.createRoom();

    expect(fakeRoomService.createRoom).toHaveBeenCalled();
    expect(component.finalMessage).toBe("Success warehouse creation!");
  })

  it('should fail creation', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);
    let fakeFloorService = TestBed.inject(FloorService);

    const fakeRoomService = jasmine.createSpyObj('RoomService', ['createRoom']);
    fakeRoomService.createRoom.and.returnValue(throwError({
      error: {
        status: 400,
        message: "error"
      }
    }));

    component = new CreateRoomComponent(fakeLocation,fakeRoomService,fakeFloorService,fakeMessageService);

    component.createRoom();

    expect(fakeRoomService.createRoom).toHaveBeenCalled();
    expect(component.finalMessage).toBe("error");
  })
});
