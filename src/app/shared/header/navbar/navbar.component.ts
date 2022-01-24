import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  constructor(
    public readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly auth: AuthService,
    private readonly toastr: ToastrService) {
  }

  handleLogout() {
    this.authService.logoutUser().subscribe({
      next: () => {
        this.authService.currentUser = null;
        this.toastr.success('You was successfully logout');
      },
      error: () => {
        this.toastr.error('Something went wrong...');
      },
    });
  }
}
