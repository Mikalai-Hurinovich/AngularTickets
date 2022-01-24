import { Injectable } from '@angular/core';

import { IUser } from '../../pages/user/user.model';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get('/api/users', options)
      .pipe(map(res => res as IUser[]));
  }

  loginUser(name: string, pass: string): Observable<IUser> {
    const loginInfo = { username: name, password: pass };
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // @ts-ignore
    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap(data => {
        // @ts-ignore
        this.currentUser = data.user as IUser;
      }))
    // @ts-ignore
      .pipe(catchError(() => {
        return of(false);
      }));
  }

  logoutUser(): Observable<object> {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post('/api/logout', {}, options);
  }

  createUser(user: IUser): Observable<Observable<never>> {
    return this.getUsers()
      .pipe(map((users) => {
        users.push(user);
        return EMPTY;
      },
      ));
  }

  createAdmin(user: IUser): Observable<Observable<never>> {
    return this.getUsers()
      .pipe(map((users) => {
        users.push({ ...user, isAdmin: true });
        return EMPTY;
      },
      ));
  }

  isAuth(): boolean {
    return !!this.currentUser;
  }
}
