import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/User/auth.service'; // Adjust the path as necessary
import { User } from '../model/user';
import { MessageService } from '../service/message/message.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User = {
  };

  constructor(private authService: AuthService, private messageservice: MessageService,    private location: Location,
    ) { }

  ngOnInit(): void {
    this.user.token = this.authService.getToken();
    this.user = this.authService.getUserFromToken();}

  onDeleteAccount(): void {
    console.log('Delete account');
    if (this.user.email) {
      this.authService.deleteUser(this.user).subscribe(
        response => {
          console.log('Account deleted', response);
          this.messageservice.add(response.error?.toString() ?? "Account deleted successfully");
          this.authService.logout();
        },
        error => {
          console.error('Error deleting account', error)  
          // Handle the error, e.g., show an error message
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
