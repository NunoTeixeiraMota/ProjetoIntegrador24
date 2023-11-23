import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from '../../service/Building/building.service';
import Building from 'src/app/model/building';

@Component({
  selector: 'app-update-building',
  templateUrl: './update-building.component.html',
  styleUrls: ['./update-building.component.css']
})
export class UpdateBuildingComponent implements OnInit {
  buildingId!: string | null;
  buildingData = {
    id: '',
    name: '',
    localizationoncampus: '',
    floors: 0,
    lifts: 0,
    maxCel: [5000]
  };

  constructor(private route: ActivatedRoute, private buildingService: BuildingService) {
    
    this.buildingId = buildingService.getBuildingId();
  }

  ngOnInit() {
    if (this.buildingId) {
      this.buildingService.getBuildingDetails(this.buildingId).subscribe(
        (selectedBuilding: Building) => {
          this.buildingData = selectedBuilding;
        },
        error => {
          console.error('Error fetching building details:', error);
        }
      );
    }
  }

  updateBuilding() {
    this.buildingData.id = this.buildingId || ''; // Assign the building ID
    this.buildingService.updateBuilding(this.buildingData).subscribe(
      response => console.log('Building updated:', response),
      error => console.error('Error updating building:', error)
    );
  }
  addMaxCel() {
    this.buildingData.maxCel.push(0); 
  }

  removeMaxCel(index: number) {
    this.buildingData.maxCel.splice(index, 1); /
  }
}
