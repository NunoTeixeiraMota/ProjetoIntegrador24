import { Component, OnInit } from '@angular/core';
import { FloorService } from '../../service/Floor/floor.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import Building from 'src/app/model/building';
import {MessageService} from '../../service/message/message.service'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent implements OnInit {

  floorData = {
    building: '',
    name: '',
    description: '',
    hall: '',
    room: 0,
    floorMap: '',
    hasElevator: false,
    passages: []
  };

  buildings: Building[] = [];
  isFormReadyToSubmit: boolean = false;
  uploadedFileName: string | undefined;
  errorMessage: string |null= null;
  successMessage: string|null= null;

  constructor(
    private floorService: FloorService, 
    private buildingService: BuildingService,
    private messageService : MessageService,
    private titleService: Title) {}
      
  ngOnInit() {
    this.getBuildings();
    this.titleService.setTitle('RobDroneGo: Create Floor');
  }

  createFloor() {
    this.errorMessage = null;
    this.successMessage = null;

    // Validation checks
    if (!this.floorData.name.trim()) {
      this.errorMessage = 'Name cannot be empty.';
      return;
    }

    if (this.floorData.room < 0) {
      this.errorMessage = 'Floor must have at least 1 room.';
      return;
    }

    this.floorData.hall = "1";
    this.floorData.room = 1;

    this.floorService.createFloor(this.floorData).subscribe(
      response => {
        console.log('Floor Created:', response);
        this.successMessage = 'Floor Created successfully!';
      },
      error => {
        console.error('Error creating floor:', error);
        this.errorMessage = 'Error Creating Floor. Please try again.';
      });
  }

  handleUploadSuccess(filename: string) {
    this.floorData.floorMap = filename;
    this.isFormReadyToSubmit = true;
  }
  
  getBuildings(): void {
    this.buildingService.getBuildings().subscribe(
      (buildings: Building[]) => {
        this.buildings = buildings;
      },
      (error: any) => {
        if(error.code == 404) this.messageService.add("Error: No Connection to Server");
        console.error('Error fetching buildings', error);
      }
    );
  }
}