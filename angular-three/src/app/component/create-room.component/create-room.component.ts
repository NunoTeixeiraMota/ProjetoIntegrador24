import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { RoomService } from 'src/app/service/Room/Room.service';
import { FloorService } from 'src/app/service/Floor/floor.service';
import { RoomCategory } from 'src/app/model/room';
import floor from 'src/app/model/floor';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-room-create',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  room = {
    floor: "",
    name: "",
    category: RoomCategory.Anfiteatro,
    description: "",
    dimension: [0,0]
  };

  roomCategories = Object.values(RoomCategory);
  floors: floor[] = [];

  constructor(
    private location: Location,
    private RoomService: RoomService,
    private FloorService: FloorService,
    private messageService: MessageService,
    private titleService: Title
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
    this.getFloors();
    this.titleService.setTitle('RobDroneGo: Create Room');
  }

  getFloors(): void {
    this.FloorService.listFloors().subscribe(
      (floors: floor[]) => {
        console.log('Fetched Floors:', floors);
        this.floors = floors;
      },
      (error: any) => {
        if(error.code == 404) this.messageService.add("Error: No Connection to Server");
        console.error('Error fetching floors', error);
      }
    );
  }

  createRoom() {
    const selectedFloor = this.floors.find(floor => floor._id === this.room.floor);
    if(selectedFloor){
      this.room.floor = selectedFloor._id;
      let errorOrSuccess: any = this.RoomService.createRoom(this.room);

      errorOrSuccess.subscribe(
        (data: any) => {
          //success
          this.messageService.add("Success room creation!");
          this.finalMessage = "Success room creation!";
        },
        
        (error: any) => {
          //error
          this.messageService.add(error.error.message);
          this.finalMessage = error.error.message;
        }
      );
    }else{
      this.messageService.add("Error: Selected floor does not exist");
      console.error('Selected floor does not exist.');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
