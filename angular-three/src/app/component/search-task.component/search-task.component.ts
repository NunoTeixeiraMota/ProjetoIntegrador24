import { Component, OnInit } from '@angular/core';
import taskPickDelivery from 'src/app/model/taskPickDelivery';
import taskVigilance from 'src/app/model/taskVigilance';
import { TaskService } from 'src/app/service/Task/task.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-search-tasks',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.scss']
})
export class SearchTasksComponent implements OnInit{
  filteredVigilanceTasks: taskVigilance[] = [];
  pickDeliveryTasks: taskPickDelivery[] = [];
  isLoading = false;
  vigilanceSearch: string = "";
  pickDeliverySearch: string = "";

  constructor(private taskService: TaskService,private messageService: MessageService) {}
  ngOnInit() {
    this.isLoading = true;
    this.taskService.searchTasks("").subscribe({
      next: (data) => {
        this.filteredVigilanceTasks = data.vigilanceTasks;
        this.pickDeliveryTasks = data.pickDeliveryTasks;
        this.isLoading = false;
        console.log(data.vigilanceTasks);
      },
      error: (error) => {
        this.messageService.add('Error fetching tasks: ' + error.error);
        this.isLoading = false;
      }
    });
  }
  
  filterVigilanceTasks(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.vigilanceSearch = value;
    this.applyVigilanceFilter();
  }

  filterPickDeliveryTasks(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.pickDeliverySearch = value;
    this.applyPickDeliveryFilter();
  }

  private applyVigilanceFilter(): void {
    this.applySearch(this.vigilanceSearch)
  }

  private applyPickDeliveryFilter(): void {
    this.applySearch(this.pickDeliverySearch)

   
  }
  private applySearch(search: string): void {
    this.taskService.searchTasks(search).subscribe({
      next: (data) => {
        this.filteredVigilanceTasks = data.vigilanceTasks;
        this.pickDeliveryTasks = data.pickDeliveryTasks;
        this.isLoading = false;
        console.log(data.vigilanceTasks);
      },
      error: (error) => {
        this.messageService.add('Error fetching tasks: ' + error.error);
        this.isLoading = false;
      }
    });
  }
}