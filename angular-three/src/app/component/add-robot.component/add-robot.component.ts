import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';
import robotType from 'src/app/model/robotType';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-robot-add',
  templateUrl: './add-robot.component.html',
  styleUrls: ['./add-robot.component.css']
})
export class AddRobotComponent implements OnInit {
  robot = {
    nickname: '',
    type: '',
    serialNumber: '',
    description: '',
    isActive: true
  };

  selectedTypeId: string = '';
  rt: robotType[] = [];

  constructor(
    private location: Location,
    private robotService: RobotService,
    private messageService: MessageService,
    private titleService: Title
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
    this.getRobotType();
    this.titleService.setTitle('RobDroneGo : Add Robot');
  }

  getRobotType(): void {
    console.log(this.robotService.listRobotType());
    this.robotService.listRobotType().subscribe(
      (rt1: robotType[]) => {
        this.rt = rt1;
      },
      (error: any) => {
        this.messageService.add("Error: No Connection to Server");
        console.error('Error fetching floors', error);
      }
    );
  }

  addRobot() {
    if(this.selectedTypeId){
      this.robot.type = this.selectedTypeId;
      let errorOrSuccess: any = this.robotService.addRobot(this.robot);

      errorOrSuccess.subscribe(
        (data: any) => {
          //success
          this.messageService.add("Sucess: Robot added with success!");
          this.finalMessage = "Robot added with success!";
        },
        
        (error: any) => {
          this.messageService.add("Error: ${error.error.message}");
          this.finalMessage = error.error.message;
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
