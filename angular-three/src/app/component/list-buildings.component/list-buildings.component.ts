import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../service/Building/building.service';
import Building from 'src/app/model/building';

@Component({
  selector: 'app-list-buildings',
  templateUrl: './list-buildings.component.html',
  styleUrls: ['./list-buildings.component.css']
})
export class ListBuildingsComponent implements OnInit {
  buildings: Building[] = []; // Assuming you have a Building model

  constructor(private buildingService: BuildingService) {}

  ngOnInit() {
    this.loadBuildings();
  }

  loadBuildings() {
    this.buildingService.getBuildings().subscribe(
      (data: Building[]) => {
        this.buildings = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
