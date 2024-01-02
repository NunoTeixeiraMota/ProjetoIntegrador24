import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { FloorService } from 'src/app/service/Floor/floor.service';
import { TaskService } from 'src/app/service/Task/task.service';
import floor from 'src/app/model/floor';
import { Title } from '@angular/platform-browser';
import taskVigilance from 'src/app/model/taskVigilance';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/User/auth.service';
import { TaskStatus } from 'src/app/model/taskStatus.enum';

@Component({
  selector: 'app-create-task-vigilance',
  templateUrl: './create-task-vigilance.component.html',
  styleUrls: ['./create-task-vigilance.component.css']
})
export class CreateVigilanceTaskComponent implements OnInit {
  user: User = {};
  floors: floor[] = [];
  selectedFloorId: string = '';

  task : taskVigilance = {
    _id:'',
    userEmail: "",
    floor: "",
    description: "",
    phoneNumber: "",
    status: TaskStatus.WaitingForAprove,
  };

  constructor(private authService: AuthService,
    private location: Location,
    private FloorService: FloorService,
    private TaskService: TaskService,
    private messageService: MessageService,
    private titleService: Title
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
    this.user.token = this.authService.getToken();
    this.user = this.authService.getUserFromToken();
    this.getFloors();
    this.titleService.setTitle('RobDroneGo: Create Vigilance Task');
  }

  getFloors(): void {
    this.FloorService.listFloors().subscribe(
      (floors: floor[]) => {
        console.log('Fetched Floors:', floors);
        this.floors = floors;
      },
      (error: any) => {
        if(error.code == 404) this.messageService.add("Error: No Connection to Server");
        console.error('Error fetching floors', error);
      }
    );
  }

  createTask() {
    if(this.selectedFloorId){
      this.task.userEmail = this.user!.email!;
      this.task.floor = this.selectedFloorId;
      let errorOrSuccess: any = this.TaskService.vigilance(this.task);

      errorOrSuccess.subscribe(
        (data: any) => {
          //success
          this.messageService.add("Success task creation!");
          this.finalMessage = "Success task creation!";
        },
        
        (error: any) => {
          //error
          this.messageService.add(error.error.message);
          this.finalMessage = error.error.message;
        }
      );
    }else{
      this.messageService.add("Error: Selected floor does not exist");
      console.error('Selected floor does not exist.');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
