import { Component, Output,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';
import { MessageService } from 'src/app/service/message/message.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-change-robot-state',
  templateUrl: './change-robot-state.component.html',
  styleUrls: ['./change-robot-state.component.css']
})
export class ChangeRobotStateComponent {
  @Output() finalMessage: string = '';
   id = 0;
  constructor(
    private robotService: RobotService,
    private messageService: MessageService
  ) { }
  changeRobotState(){
    let errorOrSuccess: any = this.robotService.changerobotState(this.id);
    errorOrSuccess.subscribe( 
      (data: any) => {
        //success
        this.messageService.add("Robot added with success!");
        this.finalMessage = "Robot added with success!";
      },
      
      (error: any) => {
        //error
        this.messageService.add(error.error.message);
        this.finalMessage = error.error.message;
      }
    );

}
}
export class ActivateRobotModule { }

