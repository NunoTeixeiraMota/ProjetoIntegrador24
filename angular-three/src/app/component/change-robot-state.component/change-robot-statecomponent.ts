import { Component, Output,NgModule } from '@angular/core';
import Robot from 'src/app/model/robot';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';
import { MessageService } from 'src/app/service/message/message.service';


@Component({
  selector: 'app-change-robot-state',
  templateUrl: './change-robot-state.component.html',
  styleUrls: ['./change-robot-state.component.css']
})
export class ChangeRobotStateComponent {
  @Output() finalMessage: string = '';
   id = 0;
   activeRobots: Robot[] = []; 

  constructor(
    private robotService: RobotService,
    private messageService: MessageService
  ) {     this.getActiveRobots(); // Call this method on component initialization
}

  getActiveRobots() {
    this.robotService.getActiveRobots().subscribe(
      (data: any) => { 
        this.activeRobots = data as Robot[];  
        this.messageService.add(`Active Robots retrieved with success!`);
      },
      
      (error: any) => {
        if(error.code == 404) this.messageService.add("Error: No Connection to Server")
        else this.messageService.add("Error : No Connection to Server");
        this.finalMessage = error.error.message;
      }
    );
  }

  changeRobotState() {
    this.robotService.changerobotState(this.id).subscribe(
      (data: any) => { 
        const robotresponse = data as Robot;  // Type assertion
        this.messageService.add(`Robot State changed with success! Robot Details: Name :${robotresponse.nickname} STATE : ${robotresponse.isActive}`);
        this.getActiveRobots();
      },
      
      (error: any) => {
        if(error.code == 404) this.messageService.add("Error: No Connection to Server")
        else this.messageService.add("Error : ID Invalid / Non Existent");
        this.finalMessage = error.error.message;
      }
    );
  }
  
}


export class ActivateRobotModule { }

