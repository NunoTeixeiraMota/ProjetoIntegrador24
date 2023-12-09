import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'src/app/service/message/message.service';
@Component({
  selector: 'app-MainMenu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  constructor(private messageService: MessageService,
    private titleService: Title
    ) {}

  ngOnInit() {
    this.clearMessages();
    this.titleService.setTitle('RobDroneGo');
  }
  private clearMessages() {
    this.messageService.clear(); 
  }
}
