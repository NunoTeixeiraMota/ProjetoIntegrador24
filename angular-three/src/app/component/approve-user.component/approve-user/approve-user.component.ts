import { Component, OnInit } from '@angular/core';
import { error } from 'cypress/types/jquery';
import { UserService } from 'src/app/service/User/User.service';
import { AuthService } from 'src/app/service/User/auth.service';
import { MessageService } from 'src/app/service/message/message.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-approve-user',
  standalone: true,
  imports: [],
  templateUrl: './approve-user.component.html',
  styleUrl: './approve-user.component.scss'
})
export class ApproveUserComponent implements OnInit {
  users: User[] = [];
  status: string = "";
  isLoading = false;

  constructor (private userService: UserService, private messageService: MessageService,private userAuthService: AuthService){}
  ngOnInit(): void {
    this.isLoading = true;
    this.userAuthService.ListUsers().subscribe(
      (data) => {
        this.users = data.users;
        console.log('Users:', data);
      }
    )

  }

  approveUser(userEmail: string,status: string):void{
    
    if (status === 'approve') {
      console.log ('Aproving user');
      this.userService.approve(userEmail).subscribe(
        (response) => {
          this.reloadUsers();
          this.handleSuccess('User approved successfully');
        },
        (error) => {
          console.error('Approval Error:',error);
          this.handleError(error);
        }
      
      );
    } else if (status === 'deny') {
      console.log ('Denying task');
  
      this.userService.denny(userEmail).subscribe(
      (response) => {
        this.reloadUsers();
        this.handleSuccess('Pick Delivery Task denied successfully');
      },
      (error) => {
        console.error('Denial Error:',error);
        this.handleError(error);
      }
      );
    }
  }

  private reloadUsers():void {
    this.userAuthService.ListUsers().subscribe(
      (data) => {
        this.users = data.users;
        this.isLoading = false;
        console.log('Users:', data);
      },
    )
  }

  private handleSuccess(message:string):void {
    this.messageService.add(message);
  }
  private handleError(error:any):void {
    this.messageService.add('Error fetching users' +error.error);
  }


}
