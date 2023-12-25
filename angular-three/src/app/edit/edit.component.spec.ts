import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../service/User/User.service';
import { MessageService } from '../service/message/message.service';
import { of, throwError } from 'rxjs';
import { EditComponent } from './edit.component';

describe('RegisterComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let userServiceMock: any;
  let messageServiceMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['edit']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call userService.signUp if form is invalid', () => {
    spyOn(component, 'edit').and.callThrough();
    const form = fixture.nativeElement.querySelector('form');
    spyOn(form, 'checkValidity').and.returnValue(false);

    component.edit(new Event('click'));
    expect(component.edit).toHaveBeenCalled();
    expect(userServiceMock.signUp).not.toHaveBeenCalled();
  });
  it('should call userService.edit with correct data when form is valid', () => {
    userServiceMock.signUp.and.returnValue(of({
      userDTO: {
        firstName: 'Miguel',
        lastName: 'asd',
        email: 'zzzznunozzzz@gmail.com',
        role: 'ROLE_USER'
      },
      token: 'mock-token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }));

    const firstNameInput = fixture.nativeElement.querySelector('input[name="firstName"]');
    const lastNameInput = fixture.nativeElement.querySelector('input[name="lastName"]');
    const emailInput = fixture.nativeElement.querySelector('input[name="email"]');
    const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');
    const termsCheckbox = fixture.nativeElement.querySelector('input[name="termsAndConditions"]');

    firstNameInput.value = 'Miguel';
    lastNameInput.value = 'asd';
    emailInput.value = 'zzzznunozzzz@gmail.com';
    passwordInput.value = '12345';
    termsCheckbox.checked = true;

    firstNameInput.dispatchEvent(new Event('input'));
    lastNameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    termsCheckbox.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    component.edit(new Event('click'));

    const expectedUser = {
      firstName: 'Miguel',
      lastName: 'asd',
      email: 'zzzznunozzzz@gmail.com',
      password: '12345'
    };

    expect(userServiceMock.signUp).toHaveBeenCalledWith(expectedUser);
  });

  
  it('should handle error when userService.signUp fails', () => {
    const errorResponse = new Error('Test Error');
    userServiceMock.signUp.and.returnValue(throwError(() => errorResponse));
    component.edit(new Event('click'));
    expect(messageServiceMock.add).toHaveBeenCalledWith("Error: " + errorResponse);
  });

  it('should open privacy policy popup', () => {
    spyOn(window, 'open').and.callThrough();
    component.openPrivacyPolicyPopup();
    expect(window.open).toHaveBeenCalledWith('privacy-policy', 'Privacy Policy', 'width=600,height=400,resizable=yes,scrollbars=yes,status=yes');
  });

  // DOM Manipulation
  it('should check email field validity with direct DOM manipulation', () => {
    const emailInput = fixture.nativeElement.querySelector('input[name="email"]');
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emailInput.validity.valid).toBeFalse();

    emailInput.value = 'valid@email.com';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emailInput.validity.valid).toBeTrue();
  });

  it('should check first name field validity', () => {
    const firstNameInput = fixture.nativeElement.querySelector('input[name="firstName"]');
    firstNameInput.value = ''; // Test with empty string (invalid case)
    firstNameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(firstNameInput.validity.valid).toBeFalse();

    firstNameInput.value = 'John'; // Test with valid input
    firstNameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(firstNameInput.validity.valid).toBeTrue();
  });

  it('should check last name field validity', () => {
    const lastNameInput = fixture.nativeElement.querySelector('input[name="lastName"]');
    lastNameInput.value = '';
    lastNameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(lastNameInput.validity.valid).toBeFalse();

    lastNameInput.value = 'Doe';
    lastNameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(lastNameInput.validity.valid).toBeTrue();
  });

  it('should check password field validity', () => {
    const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(passwordInput.validity.valid).toBeFalse();

    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(passwordInput.validity.valid).toBeTrue();
  });

  it('should check terms and conditions checkbox validity', () => {
    const termsCheckbox = fixture.nativeElement.querySelector('input[name="termsAndConditions"]');
    termsCheckbox.checked = false;
    termsCheckbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(termsCheckbox.validity.valid).toBeFalse();

    termsCheckbox.checked = true;
    termsCheckbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(termsCheckbox.validity.valid).toBeTrue();
  });
});