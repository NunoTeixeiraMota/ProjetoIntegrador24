import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../service/Building/building.service';
import Building from 'src/app/model/building';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building-selection',
  templateUrl: './select-building.component.html',
  styleUrls: ['./select-building.component.css']
})
export class BuildingSelectionComponent implements OnInit {
  buildings: Building[] = [];
  loading: boolean = true;

  constructor(
    private buildingService: BuildingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBuildings();
  }

  loadBuildings() {
    this.buildingService.getBuildings().subscribe(
      (data: Building[]) => {
        this.buildings = data;
        this.loading = false;
      },
      error => {
        console.error('Error:', error);
        this.loading = false;
      }
    );
  }

  selectBuilding(building: Building) {
    // Set the selected building ID in the service
    this.buildingService.setBuildingId(building._id);

    // Navigate to the update-building route with the selected building ID
    this.router.navigate(['/update-building', building._id]);
  }

  getBuildingProp(building: Building, propPath: string): any {
    const props = propPath.split('.');
    let result: any = building;
  
    for (const prop of props) {
      if (result && result[prop] !== undefined) {
        result = result[prop];
      } else {
        return null;
      }
    }
  
    return result;
  }
}
