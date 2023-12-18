import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/User/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['sign_in', 'login']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
  });

  it('should enable the submit button when form is valid', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('123456');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.disabled).toBeFalse();
  });

  it('should disable the submit button when form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTrue();
  });

  it('should call AuthService.sign_in on valid form submission', async () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('123456');
    authServiceMock.sign_in.and.returnValue(of({ token: 'fakeToken', userDTO: { role: 'ROLE_USER' } }));
    fixture.detectChanges();
    await component.login();
    expect(authServiceMock.sign_in).toHaveBeenCalledWith({ email: 'test@example.com', password: '123456' });
  });

  it('should navigate to main menu on successful login', async () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('123456');
    authServiceMock.sign_in.and.returnValue(Promise.resolve({ token: 'fakeToken', userDTO: { role: 'ROLE_USER' } }));
    fixture.detectChanges();
    await component.login();
    fixture.detectChanges(); 
    expect(routerMock.navigate).toHaveBeenCalledWith(['/main-menu']);
  });
  

  it('should handle login error', async () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('123456');
    authServiceMock.sign_in.and.returnValue(Promise.reject('Login failed'));
    spyOn(console, 'error');
    fixture.detectChanges();
    await component.login();
    expect(console.error).toHaveBeenCalledWith('Login failed:', 'Login failed');
  });

  it('should navigate to register page when register link is clicked', () => {
    component.register();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/register']);
  });

});
