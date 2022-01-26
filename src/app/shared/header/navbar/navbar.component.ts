import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService) {
  }

  handleLogout() {
    this.authService.logoutUser().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.authService.isLoggedIn = false;
        this.router.navigate(['']);
        this.toastr.success('You was successfully logout');
      },
      error: () => {
        this.toastr.error('Something went wrong...');
      },
    });
  }
}
