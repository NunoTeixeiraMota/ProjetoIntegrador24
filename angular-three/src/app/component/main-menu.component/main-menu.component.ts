import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message/message.service';
@Component({
  selector: 'app-MainMenu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.clearMessages(); 
  }
  private clearMessages() {
    this.messageService.clear(); 
  }
}
