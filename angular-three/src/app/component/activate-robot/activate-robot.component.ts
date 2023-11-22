import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-activate-robot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activate-robot.component.html',
  styleUrl: './activate-robot.component.css'
})
export class ActivateRobotComponent {
  @Output() finalMessage: string = '';
  robot = {
    id: 0,
    nickname: 'Robot nickname',
    type: 0,
    serialNumber: "Robot serial number",
    description: "Robot description",
    isActive: true
  };
  constructor(
    private robotService: RobotService,
    private messageService: MessageService
  ) { }
  changeRobotState(){
    let errorOrSuccess: any = this.robotService.changerobotState(this.robot.id);
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
