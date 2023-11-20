import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { RoomService } from 'src/app/service/Room/Room.service';
import { RoomCategory } from 'src/app/model/room';

@Component({
  selector: 'app-room-create',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  room = {
    id: "Identifier",
    floor: {id: "Identifier",name: "Name",description: "Description",hall: "Hall",room: 0,floorMap: "Floor Map",hasElevator: true,building: {id: "Identifier",name: "Name",localizationoncampus: "Localization On Campus",floors: 0,lifts: 0,maxCel: [0, 0]},passages: []},
    name: "Name",
    category: RoomCategory.Gabinete,
    description: "Description",
    dimension: [0, 0]
  };

  constructor(
    private location: Location,
    private RoomService: RoomService,
    private messageService: MessageService
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
  }

  createRoom() {
    let errorOrSuccess: any = this.RoomService.createRoom(this.room);

    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success room creation!");
        this.finalMessage = "Success room creation!";
        this.location.back();
      },
      
      (error: any) => {
        //error
        this.messageService.add(error.error.message);
        this.finalMessage = error.error.message;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
