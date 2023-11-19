import { Component } from '@angular/core';
import { FloorService } from '../../service/Floor/floor.service'

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent {
  floorData = {
    name: '',
    building: '',
    description: '',
    hall: '',
    room: '',
    floorMap: '',
    hasElevator: false,
  };

  constructor(private flooService: FloorService) {}

  createFloor() {
    this.flooService.createFloor(this.floorData).subscribe(
      response => console.log('Floor created:', response),
      error => console.error('Error:', error)
    );
  }
}
