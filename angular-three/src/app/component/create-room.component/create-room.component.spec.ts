import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs'; 
import { CreateRoomComponent } from './create-room.component';
import { RoomCategory } from 'src/app/model/room';
import { RoomService } from 'src/app/service/Room/Room.service';

describe('CreateRoomComponent', () => {
  let component: CreateRoomComponent;
  let fixture: ComponentFixture<CreateRoomComponent>;
  let roomService: RoomService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRoomComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [RoomService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    roomService = TestBed.inject(RoomService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default room values', () => {
    expect(component.room).toEqual({
      floor: "",
      name: "",
      category: RoomCategory.Anfiteatro,
      description: "",
      dimension: [0,0]
    });
  });

  it('should call createRoom and return room data', () => {
    const response = { message: 'Success room creation!' };
    spyOn(roomService, 'createRoom').and.returnValue(of(response));
    roomService.createRoom(component.room);
    expect(roomService.createRoom).toHaveBeenCalledWith(component.room);
  });

  it('should handle error on createRoom', () => {
    spyOn(roomService, 'createRoom').and.returnValue(throwError(() => new Error('Error')));
    component.createRoom();
  });
});
