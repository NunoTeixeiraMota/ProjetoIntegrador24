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
isFormReadyToSubmit: boolean = false; // New property to control form submission

  createFloor() {
    if (this.floorData.floorMap) {
      this.flooService.createFloor(this.floorData).subscribe(
        response => console.log('Floor created:', response),
        error => console.error('Error:', error)
      );
    } else {
      console.error('Floor map is not uploaded yet.');
    }
  }

  handleUploadSuccess(filename: string) {
    this.floorData.floorMap = filename;
    console.log('File uploaded:', filename);
    this.isFormReadyToSubmit = true; // Enable form submission
    console.log('File uploaded:', filename);
  }
}
