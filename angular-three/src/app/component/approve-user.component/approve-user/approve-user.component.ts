import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/User/User.service';
import { AuthService } from 'src/app/service/User/auth.service';
import { MessageService } from 'src/app/service/message/message.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-approve-user',
  templateUrl: './approve-user.component.html',
  styleUrls: ['./approve-user.component.scss']
})
export class ApproveUserComponent implements OnInit {
    users: User[] = [];
    isLoading = false;

    constructor (
        private userService: UserService, 
        private messageService: MessageService,
        private userAuthService: AuthService
    ) {}

    ngOnInit(): void {
      this.isLoading = true;
      this.userAuthService.ListUsers().subscribe(
          (users: User[]) => { // Assuming the response is an array of User objects
              this.users = users;
              this.isLoading = false;
          },
          (error) => {
              console.error('Error fetching users:', error);
              this.isLoading = false;
          }
      );
  }
  
    approveUser(email: string, action: string): void {
    
    if (action === 'approve') {
      console.log ('Aproving user');
      console.log(email)
      this.userService.approve(email).subscribe(
        (response) => {
          this.reloadUsers();
          this.handleSuccess('User approved successfully');
        },
        (error) => {
          console.error('Approval Error:',error);
          this.handleError(error);
        }
      
      );
    } else if (action === 'deny') {
      console.log ('Denying task');
  
      this.userService.denny(email).subscribe(
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
  getSelectValue(event: Event): string {
    return (event.target as HTMLSelectElement).value;
}


}
