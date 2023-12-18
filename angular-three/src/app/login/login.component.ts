import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/User/auth.service';
import { User } from '../model/user';
import { MessageService } from '../service/message/message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Renamed for clarity
  isLoading = false; // Added loading state

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private router: Router,
    private messageservice: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Added email validation
      password: ['', Validators.required]
    });
  }

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    try {
      const userLogged = await this.authService.sign_in({ email, password });
      if (userLogged?.token) {
        this.authService.login(userLogged.token, userLogged.userDTO.role);
        console.log(userLogged.token);
        console.log(userLogged.userDTO.role);
        this.router.navigate(['/main-menu']);
      }
    } catch (error) {
      console.error('Login failed:', error);
      
      if (error instanceof HttpErrorResponse) {
        let errorMessage = 'Unknown error occurred';
        if (error.error && error.error.errors && error.error.errors.message) {
          errorMessage = error.error.errors.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        this.messageservice.add("Error: " + errorMessage);
      } else {
        // If the error is not an instance of HttpErrorResponse
        this.messageservice.add("Error: An unexpected error occurred");
      }
    
    } finally {
      this.isLoading = false;
    }
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
