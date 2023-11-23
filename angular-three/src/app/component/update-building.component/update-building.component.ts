import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../service/Building/building.service';
import Building from 'src/app/model/building';

@Component({
  selector: 'app-update-building',
  templateUrl: './update-building.component.html',
  styleUrls: ['./update-building.component.css']
})
export class UpdateBuildingComponent implements OnInit {
  buildingData = {
    id: '',
    name: '',
    localizationoncampus: '',
    floors: 0,
    lifts: 0,
    maxCel: [5000]
  };

  selectedBuildingId: string = '';
  buildings: Building[] = [];

  constructor(private buildingService: BuildingService) {}

  ngOnInit() {
    this.getBuildings();
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

  updateBuilding() {
    const selectedBuilding = this.buildings.find(building => building._id === this.selectedBuildingId);

    if (selectedBuilding) {
      this.buildingData.id = selectedBuilding._id;

      this.buildingService.updateBuilding(this.buildingData).subscribe(
        response => console.log('Building updated:', response),
        error => console.error('Error updating building:', error)
      );
    }
  }

  addMaxCel() {
    this.buildingData.maxCel.push(0);
  }

  removeMaxCel(index: number) {
    this.buildingData.maxCel.splice(index, 1);
  }
}
