import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements DoCheck {

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly toastr: ToastrService) {
  }
  
  ngDoCheck(): void {
    this.cdr.markForCheck();
  }

  handleLogout() {
    this.authService.logoutUser().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.authService.isLoggedIn = false;
        this.router.navigate(['']);
        this.toastr.success('You was successfully logout');
        this.cdr.markForCheck();
      },
      error: () => {
        this.toastr.error('Something went wrong...');
        this.cdr.markForCheck();
      },
    });
  }
}
