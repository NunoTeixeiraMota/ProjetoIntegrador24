import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/User/auth.service';
import { MessageService } from 'src/app/service/message/message.service';
@Component({
  selector: 'app-MainMenu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  currentUserRole: string | null = null;

  constructor(private messageService: MessageService,
    private titleService: Title,
    private authService: AuthService,
    ) {}

  ngOnInit() {
    this.currentUserRole = this.authService.getCurrentUserRole();
    console.log(this.currentUserRole);
    this.clearMessages();
    this.titleService.setTitle('RobDroneGo');
  }
  private clearMessages() {
    this.messageService.clear(); 
  }
}
