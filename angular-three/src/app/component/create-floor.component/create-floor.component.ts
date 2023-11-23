import { Component, OnInit } from '@angular/core';
import { FloorService } from '../../service/Floor/floor.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import Building from 'src/app/model/building';
import Floor from 'src/app/model/floor';

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent implements OnInit {

  floorData = {
    name: '',
    description: '',
    building: '',
    hall: '',
    room: '',
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
      this.floorService.createFloor(this.floorData).subscribe(
        response => console.log('Floor created:', response),
        error => console.error('Error:', error));
  }

  handleUploadSuccess(filename: string) {
    this.floorData.floorMap = filename; // Update the floorMap property
    this.isFormReadyToSubmit = true;
  }
  

  getBuildings(): void {
    this.buildingService.getBuildings().subscribe(
      (buildings: Building[]) => {
        console.log('Fetched Buildings:', buildings);
        this.buildings = buildings;
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
  }
}
