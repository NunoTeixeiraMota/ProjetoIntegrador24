import { Component, OnInit } from '@angular/core';
import taskVigilance from '../model/taskVigilance';
import taskPickDelivery from '../model/taskPickDelivery';
import { TaskService } from '../service/Task/task.service';
import { MessageService } from '../service/message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './non-aproved-list.component.html',
  styleUrls: ['./non-aproved-list.component.scss']
})
export class NonAprovedListComponent implements OnInit {
  vigilanceTasks: taskVigilance[] = [];
  pickDeliveryTasks: taskPickDelivery[] = [];
  isLoading = false;

  constructor(private taskService: TaskService,private messageService: MessageService) {}

  ngOnInit() {
    this.isLoading = true;
    this.taskService.getNonAprovedTasks().subscribe(
      (data) => {
        this.vigilanceTasks = data.vigilanceTasks;
        this.pickDeliveryTasks = data.pickDeliveryTasks;
        this.isLoading = false;
      },
      (error) => {
        this.messageService.add('Error fetching tasks: ' + error.error);
        this.isLoading = false;
      }
    );
  }
}
