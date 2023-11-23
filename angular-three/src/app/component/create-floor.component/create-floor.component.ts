import { Component, OnInit } from '@angular/core';
import { FloorService } from '../../service/Floor/floor.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import Building from 'src/app/model/building';

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

  constructor(
    private floorService: FloorService, 
    private buildingService: BuildingService) {}

  ngOnInit() {
    this.getBuildings();
  }

  createFloor() {
    console.log(this.floorData);
    this.floorService.createFloor(this.floorData).subscribe(
      response => console.log('Floor created:', response),
      error => console.error('Error:', error));
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
        console.error('Error fetching buildings', error);
      }
    );
  }
}