import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../pages/authentication/login/login.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { ButtonComponent } from '../shared/button/button.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let toastrService: ToastrService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule.withRoutes([])],
      declarations: [
        LoginComponent,
        ButtonComponent,
      ],
      providers: [
        { provide: ToastrService, useValue: toastrService },
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should mark username as invalid when it has no value', () => {
    const ctrl = component.loginForm.get('userName');
    ctrl?.setValue(null);
    fixture.detectChanges();
    expect(component.loginInvalid).toBe(false);
    expect(ctrl?.invalid).toBeTruthy();
  });

  it('should mark username as valid when it has value', () => {
    const ctrl = component.loginForm.get('userName');
    ctrl?.setValue('test');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();
  });

  it('should display User Name on the label for the field', () => {
    const el = fixture.debugElement.query(By.css('.form-group label.userName-label'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('for')).toEqual('userName');
  });

  it('should display Password on the label for the field', () => {
    const el = fixture.debugElement.query(By.css('.form-group label.password-label'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('for')).toEqual('password');
  });

  it('should mark password as invalid when it has no value', () => {
    const ctrl = component.loginForm.get('userPassword');
    ctrl?.setValue(null);
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();
  });

  it('should mark password as valid when it has value', () => {
    const ctrl = component.loginForm.get('userPassword');
    ctrl?.setValue('test');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();
  });

  it('should have type=submit', () => {
    const el = fixture.debugElement.query(By.css('.buttons app-button'));
    expect(el.nativeElement.getAttribute('type')).toEqual('submit');
  });

  it('button should be disabled', () => {
    const userPassCtrl = component.loginForm.get('userPassword');
    const userNameCtrl = component.loginForm.get('userName');
    userNameCtrl?.setValue(null);
    userPassCtrl?.setValue(null);
    fixture.detectChanges();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('button should not be disabled', () => {
    const userPassCtrl = component.loginForm.get('userPassword');
    const userNameCtrl = component.loginForm.get('userName');
    userNameCtrl?.setValue('test');
    userPassCtrl?.setValue('test');
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('the button should be disabled when only userPassword valid', () => {
    const userPassCtrl = component.loginForm.get('userPassword');
    userPassCtrl?.setValue('');
    fixture.detectChanges();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('the button should be disabled when only userName valid', () => {
    const userNameCtrl = component.loginForm.get('userName');
    userNameCtrl?.setValue('test');
    fixture.detectChanges();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should call submit func when the submit button clicked', () => {
    const func = spyOn(component, 'handleCancelButtonClick');
    const el = fixture.debugElement.query(By.css('.buttons .cancelButton'));
    el.triggerEventHandler('click', null);
    expect(func).toHaveBeenCalled();

    el.nativeElement.dispatchEvent(new Event('click'));
    expect(func).toHaveBeenCalled();

    (el.nativeElement as HTMLButtonElement).click();
    expect(func).toHaveBeenCalled();
  });
});
