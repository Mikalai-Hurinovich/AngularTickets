import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationComponent } from '../pages/authentication/registration/registration.component';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../shared/button/button.component';

describe('RegistrationComponent', () => {
  let fixture: ComponentFixture<RegistrationComponent>;
  let component: RegistrationComponent;
  let toastrService: ToastrService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])],
      declarations: [
        RegistrationComponent,
        ButtonComponent,
      ],
      providers: [
        { provide: ToastrService, useValue: toastrService },
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should mark username as invalid when it has no value', () => {
    const ctrl = component.registrationForm.get('userName');
    ctrl?.setValue(null);
    fixture.detectChanges();
    expect(ctrl?.valid).toBe(false);
  });

  it('should mark username as valid when it has value', () => {
    const ctrl = component.registrationForm.get('userName');
    ctrl?.setValue('test');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();
  });

  it('should mark password as invalid when it has no value', () => {
    const ctrl = component.registrationForm.controls['passwords'].get('userPassword');
    ctrl?.setValue(null);
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();
  });

  it('should mark passwords as invalid when they are not equal', () => {
    const pass = component.registrationForm.controls['passwords'].get('userPassword');
    const confirmPass = component.registrationForm.controls['passwords'].get('confirmPassword');
    pass?.setValue('123');
    confirmPass?.setValue('231');
    fixture.detectChanges();
    expect(pass?.value).not.toBe(confirmPass?.value);
  });

  it('should error appear when passwords are not equal', () => {
    const pass = component.registrationForm.controls['passwords'].get('userPassword');
    const confirmPass = component.registrationForm.controls['passwords'].get('confirmPassword');
    pass?.setValue('123123');
    confirmPass?.setValue('231');
    fixture.detectChanges();
    expect(component.handleValidatePasswordsMismatch).toBeTruthy();
  });

  it('should appear error when passwords are not equal', () => {
    const pass = component.registrationForm.controls['passwords'].get('userPassword');
    const confirmPass = component.registrationForm.controls['passwords'].get('confirmPassword');
    pass?.setValue('123123');
    confirmPass?.setValue('123123');
    fixture.detectChanges();
    expect(component.handleValidatePasswordsMismatch()).toBe(false);
  });

  it('should appear error when password length less then 6', () => {
    const pass = component.registrationForm.controls['passwords'].get('userPassword');
    pass?.setValue('123');
    fixture.detectChanges();
    expect(pass?.errors?.['minlength'].requiredLength).toBeTruthy();
  });

  it('button should be disabled', () => {
    const userPassCtrl = component.registrationForm.controls['passwords'].get('userPassword');
    const userNameCtrl = component.registrationForm.controls['passwords'].get('confirmPassword');
    userNameCtrl?.setValue(null);
    userPassCtrl?.setValue(null);
    fixture.detectChanges();
    expect(component.registrationForm.invalid).toBeTruthy();
  });

  it('button should not be disabled', () => {
    const nameCtrl = component.registrationForm.get('userName');
    const emailCtrl = component.registrationForm.get('userEmail');
    const passCtrl = component.registrationForm.controls['passwords'].get('userPassword');
    const confirmPassCtrl = component.registrationForm.controls['passwords'].get('confirmPassword');
    nameCtrl?.setValue('test');
    emailCtrl?.setValue('test');
    passCtrl?.setValue('123456');
    confirmPassCtrl?.setValue('123456');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('.form .buttons span app-button'));
    expect(submitButton.nativeElement.getAttribute('disabled')).not.toBeTruthy();
  });

  it('should call submit func when the submit button clicked', () => {
    const func = spyOn(component, 'handleCancelButtonClick');
    const el = fixture.debugElement.query(By.css('.buttons .cancelButton'));
    el.triggerEventHandler('click', null);
    expect(func).toHaveBeenCalled();
  });
});
