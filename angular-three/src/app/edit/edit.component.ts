import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/User/User.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { MessageService } from '../service/message/message.service';
import { Location } from '@angular/common';
import { AuthService } from '../service/User/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user: User = {};

  editUser = {
    Name: "",
    CurrentEmail: "",
    Email: "",
    CurrentPassword: "",
    Password: "",
    PhoneNumber: "",
  };

  constructor(private authService: AuthService, private userService: UserService, private messageservice: MessageService, private router: Router, private location: Location) { };

  ngOnInit(): void {
    this.user.token = this.authService.getToken();
    this.user = this.authService.getUserFromToken();
  }

  edit(event: Event) {
    event.preventDefault();
    const form = document.querySelector('form') as HTMLFormElement;

    if (form.checkValidity() === false) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    this.editUser.Name = formData.get('firstName') as string + formData.get('lastName') as string;
    this.editUser.CurrentEmail = this.user!.email!;
    this.editUser.Email = formData.get('email') as string;
    if(this.editUser.Email == ""){
      this.editUser.Email = this.editUser.CurrentEmail;
    }
    this.editUser.CurrentPassword = formData.get('currentPassword') as string;
    this.editUser.Password = formData.get('password') as string;
    this.editUser.PhoneNumber = formData.get('phonenumber') as string;
    console.log(this.editUser);
    this.userService.edit(this.editUser).subscribe(
      response => {
        console.log('Success:', response);
        this.messageservice.add("User edited successfully");
      },
      error => {
        console.error('Error:', error);
        this.messageservice.add("Error editing the user");
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}