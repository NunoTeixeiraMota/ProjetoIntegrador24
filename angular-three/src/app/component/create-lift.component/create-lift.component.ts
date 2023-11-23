import { Component, OnInit } from '@angular/core';
import { LiftService } from '../../service/Lift/lift.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import Building from 'src/app/model/building';

@Component({
  selector: 'app-create-lift',
  templateUrl: './create-lift.component.html',
  styleUrls: ['./create-lift.component.css']
})
export class CreateLiftComponent implements OnInit {
  liftData = {
    localization: '',
    state: '',
    building: ''
  };

  buildings: Building[] = [];

  constructor(
    private liftService: LiftService, 
    private buildingService: BuildingService) {}

  ngOnInit() {
    this.getBuildings();
  }

  createLift() {
    this.liftService.createLift(this.liftData).subscribe(
      response => console.log('Lift created:', response),
      error => console.error('Error:', error)
    );
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
