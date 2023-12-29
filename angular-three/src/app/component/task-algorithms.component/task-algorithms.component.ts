import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message/message.service';
import { Title } from '@angular/platform-browser';
import { TaskService } from 'src/app/service/Task/task.service';

@Component({
  selector: 'app-task-algorithms',
  templateUrl: 'task-algorithms.component.html',
  styleUrls: ['task-algorithms.component.css']
})
export class ListTasksByAlgoritm implements OnInit {
  constructor(
    public taskService: TaskService,
    public messageService: MessageService,
    private titleService: Title
  ) { }

  /*
  const tasks = [
    {
      userEmail: "",
      namePickup: "",
      nameDelivery: "",
      description: "",
      type: ""
    }
  ];*/
  
  count = 0;

  ngOnInit(): void {
    this.titleService.setTitle('RobDroneGo: List tasks by algorithms');
  }

  listLessTime(): void{
      //not implemented
  }

  listGeneticAlgorithm(): void{
    //not implemented
}
}