import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/User/User.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { MessageService } from '../service/message/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user: User = {};

  constructor(private userService: UserService, private messageservice: MessageService, private router: Router, private location: Location) {};

  ngOnInit() {
  }

  edit(event: Event) {
    event.preventDefault();
    const form = document.querySelector('form') as HTMLFormElement;

    if (form.checkValidity() === false) {
      form.reportValidity();
      return;
    }
  
    const formData = new FormData(form);

    var firstName = formData.get('firstName') as string;
    var lastName = formData.get('lastName') as string;
    this.user.name = firstName + lastName;
    this.user.email = formData.get('email') as string;
    this.user.password = formData.get('password') as string;
    this.user.phonenumber = formData.get('phonenumber') as string;
    this.userService.edit(this.user).subscribe(
      result => {
        if (result && result.error && result.error.length > 0) {
          result.error.forEach(err => {
            this.messageservice.add(err.description);
          });
        } else {
          this.messageservice.add("User edited successfully")
          setTimeout(() => {
            this.router.navigate(['/user-profile']);
          }, 3000);
        }
      },
      error => {
        console.error("Couldn't edit the user. Reason:", error);
        this.messageservice.add("Error: " + error.error);
      }
    );
  }
  goBack(): void {
    this.location.back();
  }
}