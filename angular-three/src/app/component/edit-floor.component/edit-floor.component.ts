import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FloorService } from '../../service/Floor/floor.service'
import { MessageService } from 'src/app/service/message/message.service';
import floor from 'src/app/model/floor';
import { BuildingService } from 'src/app/service/Building/building.service';
import Building from 'src/app/model/building';

@Component({
  selector: 'app-edit-floor',
  templateUrl: './edit-floor.component.html',
  styleUrls: ['./edit-floor.component.css']
})

export class EditFloorComponent implements OnInit {
  floor = {
    id: "",
    name: '',
    building: "",
    description: '',
    hall: '',
    room: 0,
    floorMap: '',
    hasElevator: false,
    passages: [""]
  };

  floors: floor[] = [];
  buildings: Building[] = [];
  
  constructor(
    private location: Location,
    private buildingService: BuildingService,
    private floorService: FloorService,
    private messageService: MessageService
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
    this.getFloors();
    this.getBuilding();
  }

  getFloors(): void {
    this.floorService.listFloors().subscribe(
      (floors: floor[]) => {
        this.floors = floors;
      },
      (error: any) => {
        console.error('Error fetching floors', error);
      }
    );
  }

  getBuilding(): void {
    this.buildingService.getBuildings().subscribe(
      (buildings: Building[]) => {
        console.log('Fetched Floors:', buildings);
        this.buildings = buildings;
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
  }

  editFloor() {
    const selectedFloor = this.floors.find(floor => floor._id === this.floor.id);
    const selectedBuilding = this.floors.find(floor => floor.building._id === this.floor.building);
    if(selectedFloor && selectedBuilding){
      this.floor.id = selectedFloor._id;
      this.floor.building = selectedBuilding._id;
      let errorOrSuccess: any = this.floorService.editFloor(this.floor);

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
    }else{
      console.error('Selected floor does not exist.');
    }
  }

  addPassage() {
    this.floor.passages.push("");
  }

  removePassage(index: number) {
    this.floor.passages.splice(index, 1);
  }

  goBack(): void {
    this.location.back();
  }
}
