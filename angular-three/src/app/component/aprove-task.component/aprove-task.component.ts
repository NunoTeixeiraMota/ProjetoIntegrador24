import { Component, OnInit } from '@angular/core';
import taskPickDelivery from 'src/app/model/taskPickDelivery';
import taskVigilance from 'src/app/model/taskVigilance';
import { TaskService } from 'src/app/service/Task/task.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-aprove-task',
  templateUrl: './aprove-task.component.html',
  styleUrls: ['./aprove-task.component.scss']
})
export class AproveTaskComponent implements OnInit {
  vigilanceTasks: taskVigilance[] = [];
  pickDeliveryTasks: taskPickDelivery[] = [];
  isLoading = false;

  constructor(private taskService: TaskService, private messageService: MessageService) {}

  ngOnInit() {
    this.isLoading = true;
    this.taskService.getNonAprovedTasks().subscribe(
      (data) => {
        this.vigilanceTasks = data.vigilanceTasks;
        this.pickDeliveryTasks = data.pickDeliveryTasks;
        this.isLoading = false;
      },
      (error) => {
        this.messageService.add('Error fetching tasks: ' + error.message);
        this.isLoading = false;
      }
    );
  }

  updateTaskStatus(task: any, action: string) {
    const isPickDelivery = task.hasOwnProperty('CodeDelivery');
  
    if (isPickDelivery) {
      if (action === 'approve') {
        this.taskService.approvePickDeliveryTask(task._id).subscribe();
      } else if (action === 'deny') {
        this.taskService.denyPickDeliveryTask(task._id).subscribe();
      }
    } else {
      if (action === 'approve') {
        this.taskService.approveVigilanceTask(task._id).subscribe();
      } else if (action === 'deny') {
        this.taskService.denyVigilanceTask(task._id).subscribe();
      }
    }
  }
  

}
