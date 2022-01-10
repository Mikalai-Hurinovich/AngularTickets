import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;

  subscription: Subscription;

  mouseoverLogin: boolean;

  private userName: FormControl;

  private userPassword: FormControl;

  private confirmPassword: FormControl;

  private userEmail: FormControl;

  constructor(private readonly fb: FormBuilder, private readonly toastr: ToastrService,
    private readonly authService: AuthService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.userName = new FormControl('', [Validators.required]);
    this.userPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.userEmail = new FormControl('', [Validators.required]);

    this.registrationForm = this.fb.group({
      userName: this.userName,
      userEmail: this.userEmail,
      passwords: this.fb.group({
        userPassword: this.userPassword,
        confirmPassword: this.confirmPassword,
      }, { validators: this.checkPasswords }),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  checkPasswords: ValidatorFn = (): ValidationErrors | null => {
    let pass = this.userPassword.value;
    let confirmPass = this.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  };


  handleValidateEmail(): boolean {
    return (this.userEmail.touched || this.mouseoverLogin) && this.userEmail.invalid;
  }

  handleCancelButtonClick(): void {
    this.router.navigate(['']);
  }

  handleValidatePassword(): boolean {
    return (this.userPassword.touched || this.mouseoverLogin) && this.userPassword.errors?.['required'];
  }

  handleValidateConfirmPassword(): boolean {
    return (this.confirmPassword.touched || this.mouseoverLogin) && this.confirmPassword.errors?.['required'];
  }

  handleValidateLogin(): boolean {
    return (this.userName.touched || this.mouseoverLogin) && this.userName.invalid;
  }

  handleValidatePasswordsMismatch(): boolean | undefined {
    return this.registrationForm.hasError('notSame', 'passwords') && this.registrationForm.controls['passwords'].get('confirmPassword')?.dirty
        && !this.handleValidateConfirmPassword();
  }

  handleValidatePasswordMinlength(): AbstractControl {
    return this.registrationForm.controls['passwords'].get('userPassword')?.errors?.['minlength'];
  }

  handleRegisterUser(): void {
    const formValue = this.registrationForm.value;
    const data = {
      id: 6,
      userName: formValue.userName,
      userPassword: this.registrationForm.get('passwords')?.get('userPassword')?.value,
      userEmail: formValue.userEmail,
      isAdmin: false,
    };

    this.subscription = this.authService.addUser(data).subscribe({
      next: () => {
        this.toastr.success('User was successfully added');
        this.router.navigate(['user', 'login']);
      },
      error: () => {
        this.toastr.error('Something went wrong');
      },
    });
  }
}
