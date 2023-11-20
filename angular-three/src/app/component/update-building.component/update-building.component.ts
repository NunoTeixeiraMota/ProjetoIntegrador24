import { Component } from '@angular/core';
import { BuildingService } from '../../service/Building/building.service'

@Component({
  selector: 'app-update-building',
  templateUrl: './update-building.component.html',
  styleUrls: ['./update-building.component.css']
})
export class UpdateBuildingComponent {
  buildingData = {
    id: '',
    name: '',
    localizationoncampus: '',
    floors: 0,
    lifts: 0,
    maxCel: [5000] // Start with one default value or empty array
  };

  constructor(private buildingService: BuildingService) {}

  updateBuilding() {
    this.buildingService.updateBuilding(this.buildingData).subscribe(
      response => console.log('Building updated:', response),
      error => console.error('Error:', error)
    );
  }

  addMaxCel() {
    this.buildingData.maxCel.push(0); // Add a new cell with a default value
  }

  removeMaxCel(index: number) {
    this.buildingData.maxCel.splice(index, 1); // Remove the cell at the given index
  }
}
