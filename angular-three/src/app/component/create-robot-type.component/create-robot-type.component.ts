import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';

@Component({
  selector: 'app-robot-type-create',
  templateUrl: './create-robot-type.component.html',
  styleUrls: ['./create-robot-type.component.css']
})
export class CreateRobotTypeComponent implements OnInit {

  robotType = {
    id: "Identifier",
    designation: "Designation",
    brand: "Brand",
    modelRobot: "Robot Model",
    task: "//0 - vigilance, 1 - pickup & delivery, 2 - both"
};

  constructor(
    private location: Location,
    private robotService: RobotService,
    private messageService: MessageService
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
  }

  createRobotType() {
    let errorOrSuccess: any = this.robotService.createRobot(this.robotType);

    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success room creation!");
        this.finalMessage = "Success room creation!";
        this.location.back();
      },
      
      (error: any) => {
        //error
        this.messageService.add(error.error.message);
        this.finalMessage = error.error.message;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
