import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { RoomService } from 'src/app/service/Room/Room.service';
import { RoomCategory } from 'src/app/model/room';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit {

  room = {
    id: "",
    building: {id: "",name: "",localizationoncampus: "",floors: 0,lifts: 0,maxCel: [0, 0]},
    floor: {id: "",name: "",description: "",hall: "",room: 0,floorMap: "",hasElevator: true,building: {id: "",name: "",localizationoncampus: "",floors: 0,lifts: 0,maxCel: [0, 0]},passages: []},
    name: "",
    category: RoomCategory.Gabinete,
    description: "",
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
