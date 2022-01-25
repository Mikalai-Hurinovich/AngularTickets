import { Injectable } from '@angular/core';

import { IUser } from '../../pages/user/user.model';
import { catchError, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private _currentUser: IUser | null;

  get currentUser() {
    return this._currentUser;
  }

  set currentUser(user: IUser | null) {
    this._currentUser = user;
  }

  constructor(private readonly http: HttpClient) {
  }

  checkAuthStatus(): void {
    this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        this.currentUser = data as IUser;
      })).subscribe();
  }

  private getUsers(): Observable<IUser[]> {
    return this.http.get('/api/users')
      .pipe(map(res => res as IUser[]));
  }

  loginUser(name: string, pass: string): Observable<IUser> {
    const loginInfo = { username: name, password: pass };
    // @ts-ignore
    return this.http.post('/api/login', loginInfo)
      .pipe(tap(data => {
        // @ts-ignore
        this.currentUser = data.user as IUser;
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
    return this.http.post('/api/users/new', { ...user }) as Observable<IUser>;
  }

  createAdmin(user: IUser): Observable<IUser> {
    return this.http.post('/api/users', { ...user, isAdmin: true }) as Observable<IUser>;
  }

  isAuth(): boolean {
    return !!this.currentUser;
  }
}
