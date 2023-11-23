import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';

@Component({
  selector: 'app-robot-add',
  templateUrl: './add-robot.component.html',
  styleUrls: ['./add-robot.component.css']
})
export class AddRobotComponent implements OnInit {
  robot = {
    id: "",
    nickname: 'Robot nickname',
    type: "Robot Type Identifier",
    serialNumber: "Robot serial number",
    description: "Robot description",
    isActive: true
  };

  constructor(
    private location: Location,
    private robotService: RobotService,
    private messageService: MessageService
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
  }

  addRobot() {
    let errorOrSuccess: any = this.robotService.addRobot(this.robot);

    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Robot added with success!");
        this.finalMessage = "Robot added with success!";
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
