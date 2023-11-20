import { Component } from '@angular/core';
import { LiftService } from '../../service/Lift/lift.service';
@Component({
  selector: 'app-create-lift',
  templateUrl: './create-lift.component.html',
  styleUrls: ['./create-lift.component.css']
})
export class CreateLiftComponent {
  liftData = {
    localization: '',
    state: '',
    building: ''
  };

  constructor(private liftservice: LiftService) {}

  createLift() {
    this.liftservice.createLift(this.liftData).subscribe(
      response => console.log('Floor created:', response),
      error => console.error('Error:', error)
    );
  }
}
