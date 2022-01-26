import { Injectable } from '@angular/core';

import { IUser } from '../../pages/user/user.model';
import { catchError, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _currentUser: IUser;

  private _isLoggedIn: boolean;

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  get currentUser() {
    return this._currentUser;
  }

  set currentUser(user: IUser) {
    this._currentUser = user;
  }

  get token() {
    return localStorage.getItem('token') as string;
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router) {
    this.isLoggedIn = !!this.token;
  }

  checkAuthStatus(): void {
    this.http.get('/api/currentIdentity')
      .subscribe({
        next: (data) => {
          this.currentUser = data as IUser;
        },
        error: (err) => {
          this.router.navigate(['user', 'login']);
          console.warn(err);
        },
      });
  }

  isTokenActive(): boolean {
    this.http.get('/api/token')
      .subscribe((res) => {
        // @ts-ignore
        this.isLoggedIn = res;
      });
    return this.isLoggedIn;
  }

  handleCheckAdmin(): Observable<unknown> {
    return this.http.get('/api/admin');
  }

  private getUsers(): Observable<IUser[]> {
    return this.http.get('/api/users')
      .pipe(map(res => res as IUser[]));
  }

  loginUser(name: string, pass: string): Observable<IUser> {
    const loginInfo = { username: name, password: pass };
    // @ts-ignore
    return this.http.post('/api/login', loginInfo)
      .pipe(tap((data) => {
        //@ts-ignore
        if (data.user && data.token) {
          // @ts-ignore
          this.token = data.token;
          this.isLoggedIn = true;
          // @ts-ignore
          this.currentUser = data.user as IUser;
        }
      }))
    // @ts-ignore
      .pipe(catchError(() => {
        return of(false);
      }));
  }

  logoutUser(): Observable<never> {
    return this.http.post('/api/logout', {}) as Observable<never>;
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post('/api/register', { ...user }) as Observable<IUser>;
  }

  createAdmin(user: IUser): Observable<IUser> {
    return this.http.post('/api/users', { ...user, isAdmin: true }) as Observable<IUser>;
  }
}
