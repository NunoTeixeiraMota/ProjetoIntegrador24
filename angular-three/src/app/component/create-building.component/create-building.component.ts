import { Component } from '@angular/core';
import { BuildingService } from '../../service/Building/building.service'

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.css']
})
export class CreateBuildingComponent {

  constructor(private buildingService: BuildingService) {}

  createBuilding() {
    const buildingData = {
      name: "Science Building",
      localizationoncampus: "North Campus",
      floors: 5,
      lifts: 2,
      maxCel: [5000, 5200, 5400, 5600, 5800]
    };

    this.buildingService.createBuilding(buildingData).subscribe(
      response => console.log('Building created:', response),
      error => console.error('Error:', error)
    );
  }
}
