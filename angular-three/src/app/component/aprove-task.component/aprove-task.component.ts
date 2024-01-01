import { Component, OnInit } from '@angular/core';
import { response } from 'express';
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

  constructor(private taskService: TaskService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.taskService.getNonAprovedTasks().subscribe(

      (data) => {
        this.vigilanceTasks = data.vigilanceTasks;
        this.pickDeliveryTasks = data.pickDeliveryTasks;
        this.isLoading = false;
        console.log('Tasks:',data);

      },
      (error) => {
        this.messageService.add('Error fetching tasks:' + error.error);
        this.isLoading = true;
      }
    )

  } changeStatusVigilance(taskId: string, status: string): void {
    if (status === 'approve') {
      this.reloadTasks();
      this.taskService.approveVigilanceTask(taskId).subscribe(
        () => this.handleSuccess('Vigilance Task approved successfully'),
        error => this.handleError(error)
      );
    } else if (status === 'deny') {
      this.reloadTasks();
      this.taskService.denyVigilanceTask(taskId).subscribe(
        () => this.handleSuccess('Vigilance Task denied successfully'),
        error => this.handleError(error)
      );
    }
  }
  private reloadTasks(): void {
    this.taskService.getNonAprovedTasks().subscribe(
      (data) => {
        this.vigilanceTasks = data.vigilanceTasks;
        this.pickDeliveryTasks = data.pickDeliveryTasks;
        this.isLoading = false;
        console.log ('Tasks:',data);
      },
      (error) => {
        this.messageService.add('Error fetching tasks:'+ error.error);
        this.isLoading = true;
      }
    );
  }
  changeStatusPickDelivery(taskId: string, status: string): void {
    console.log('Task ID:',taskId, 'Status',status);

    if (status === 'approve') {
      console.log ('Aproving task');
      this.taskService.approvePickDeliveryTask(taskId).subscribe(
        (response) => {
          this.reloadTasks();
          this.handleSuccess('Pick Delivery Task approved successfully');
        },
        (error) => {
          console.error('Approval Error:',error);
          this.handleError(error);
        }
      
      );
    } else if (status === 'deny') {
      console.log ('Denying task');
      this.taskService.denyPickDeliveryTask(taskId).subscribe(
      (response) => {
        this.reloadTasks();
        this.handleSuccess('Pick Delivery Task denied successfully');
      },
      (error) => {
        console.error('Denial Error:',error);
        this.handleError(error);
      }
      );
    }
  }


  private handleSuccess(message: string): void {
    this.messageService.add(message);
  }

  private handleError(error: any): void {
    this.messageService.add('Error processing task: ' + error.error);
  }


}