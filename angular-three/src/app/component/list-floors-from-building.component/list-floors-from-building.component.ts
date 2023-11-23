import { Component, OnInit } from '@angular/core';
import { FloorService } from 'src/app/service/Floor/floor.service';
import Floor from 'src/app/model/floor'; 

@Component({
  selector: 'app-list-floors-from-building',
  templateUrl: 'list-floors-from-building.component.html',
  styleUrls: ['list-floors-from-building.component.css']
})
export class ListFloorsFromBuildingComponent {
  selectedBuildingId: string = '';

  Floors: Floor[] = [];

  constructor(private floorService: FloorService) {}

  ListFloorsFromBuildingComponent(buildingId: string) {
    
    this.floorService.ListFloorsFromBuildingComponent(buildingId)
      .subscribe(
        (data: Floor[]) => { 
          this.Floors = data;
        },
        error => {
          console.error('Error fetching floors', error);
        }
      );
      
  }
  onBuildingIdInput(buildingId: string) {
    this.selectedBuildingId = buildingId;
  }
}
