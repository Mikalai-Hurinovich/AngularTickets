import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.currentUser?.isAdmin) {
      return true;
    }
    this.router.navigate(['404']);
    return false;
  }

}
