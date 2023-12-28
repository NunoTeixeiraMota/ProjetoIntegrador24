import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { TaskService } from "src/app/service/Task/task.service";





@Component({

    selector: 'app-aprove-task',
    templateUrl: './aprove-task.component.html',
    styleUrls: ['./aprove-task.component.scss']

})

export class AproveTaskComponent implements OnInit{constructor(private taskService: TaskService,){}

ngOnInit(){
    this.getUnaprovedTasks();

}

getUnaprovedTasks(){
    

}
}