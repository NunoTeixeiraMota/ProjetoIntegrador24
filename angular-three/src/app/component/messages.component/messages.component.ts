import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

  getMessageStyle(message: string) {
    if (message.includes('error') || message.includes('Error')) {
      return { 'color': 'red' };
    } else if (message.includes('success') || message.includes('Success')) {
      return { 'color': 'green' };
    } else {
      return {};
    }
  }
  
}
