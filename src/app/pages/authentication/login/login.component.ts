import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  subscription: Subscription;

  mouseoverLogin: boolean;

  private userName: FormControl;

  private userPassword: FormControl;

  constructor(
    private readonly toastr: ToastrService,
    private readonly userService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.userName = new FormControl('', [Validators.required]);
    this.userPassword = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      userName: this.userName,
      userPassword: this.userPassword,
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  handleLoginUser(): void {
    if (this.loginForm.valid) {
      let userName = this.userName.value;
      let password = this.userPassword.value;

      this.subscription = this.userService.loginUser(userName, password).subscribe({
        next: (user) => {
          this.router.navigate(['']);
          this.toastr.success(`You have successfully logged in as ${user.userName}`);
        },
        error: (error) => {
          this.toastr.error(error);
          this.cdr.markForCheck();
        },
      });
    }
  }

  handleValidateLogin(): boolean {
    return (this.userName.touched || this.mouseoverLogin) && this.userName.invalid;
  }

  handleValidatePassword(): boolean {
    return (this.userPassword.touched || this.mouseoverLogin) && this.userPassword.invalid;
  }

  handleCancelButtonClick(): void {
    this.router.navigate(['']);
  }
}
