import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/User/auth.service';
import { User } from '../model/user';

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
    private formBuilder: FormBuilder, // Renamed for consistency
    private router: Router
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
      return; // Added early return for invalid form
    }

    this.isLoading = true; // Start loading
    const { email, password } = this.loginForm.value;

    try {
      const userLogged = await this.authService.sign_in({ email, password });
      if (userLogged?.token) {
        this.authService.login(userLogged.token, userLogged.userDTO.role);
        this.router.navigate(['']); // Navigate to dashboard or home
      }
    } catch (error) {
      console.error('Login failed:', error); // Error handling
    } finally {
      this.isLoading = false; // Stop loading regardless of success or failure
    }
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
