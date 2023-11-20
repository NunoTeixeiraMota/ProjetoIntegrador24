import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MessageService } from '../message/message.service';
import { of } from 'rxjs';
import { RoomService } from './Room.service';
import Room, { RoomCategory } from 'src/app/model/room';

describe('RoomService', () => {
  let service: RoomService;

  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.get(HttpClient);
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the room successfully', () => {
    let messageService: MessageService = TestBed.inject(MessageService);

    let room: Room = {
        id: "1",
        floor: {id: "3",name: "a",building: {id: "2",name: "a",localizationoncampus: "a",floors: 2,lifts: 2,maxCel: [2, 2]},description: "a",hall: "a",room: 3,floorMap: "a",hasElevator: true,passages: []},
        name: "a",
        category: RoomCategory.Gabinete,
        description: "a",
        dimension: [2, 2]
    };

    const fakeGet = jasmine.createSpyObj('HttpClient', ['post']);
    fakeGet.post.and.returnValue(of(new HttpResponse({
      body: room
    })));

    service = new RoomService(fakeGet, messageService);

    let roomCreate = service.createRoom(room);

    roomCreate.subscribe(response => expect(response.body).toBe(room))
  })
});