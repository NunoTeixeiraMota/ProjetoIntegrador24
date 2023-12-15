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
    if (message.includes('error')) {
      return { 'color': 'red' };
    } else if (message.includes('success')) {
      return { 'color': 'green' };
    } else {
      return {};
    }
  }
}
