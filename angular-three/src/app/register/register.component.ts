import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/User/User.service';
import { User } from '../model/user';
import { MessageService } from '../service/message/message.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {};

  constructor(private userService: UserService, private messageservice: MessageService) {};

  ngOnInit() {
  }

  register(event: Event) {
    event.preventDefault(); // This prevents the default form submission behavior
    const form = document.querySelector('form') as HTMLFormElement;

    if (form.checkValidity() === false) {
      form.reportValidity(); // This will show the browser's default validation messages
      return; // Stop the function if the form is not valid
    }
  
    const formData = new FormData(form);

    this.user.firstName = formData.get('firstName') as string;
    this.user.lastName = formData.get('lastName') as string;
    this.user.email = formData.get('email') as string;
    this.user.password = formData.get('password') as string;
    console.log(this.user);
    this.userService.signUp(this.user).subscribe(
      result => {
        // Handle successful registration
        console.log("User registered successfully", result);
        // You might want to navigate the user to a different page or show a success message
      },
      error => {
        // Handle registration error

        console.error("Couldn't register the user. Reason:", error);
        this.messageservice.add("Error: " + error.error);
        // You might want to show an error message to the user
      }
    );
  }
  openPrivacyPolicyPopup() {
    const url = 'privacy-policy';
    const windowName = 'Privacy Policy';
    const windowFeatures = 'width=600,height=400,resizable=yes,scrollbars=yes,status=yes';
  
    window.open(url, windowName, windowFeatures);
  }


}
