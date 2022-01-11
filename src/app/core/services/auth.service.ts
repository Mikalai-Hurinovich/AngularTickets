import { Injectable } from '@angular/core';

import { IUser } from '../../pages/user/user.model';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from '../../../assets/data/users';

@Injectable()
export class AuthService {
  private _currentUser: IUser;

  get currentUser() {
    return this._currentUser;
  }

  set currentUser(user: IUser) {
    this._currentUser = user;
  }

  private getUsers(): Observable<Array<IUser>> {
    return of(Users);
  }

  loginUser(name: string, pass: string): Observable<IUser> {
    return this.getUsers()
      .pipe(map((users: Array<IUser>) => users.find(({
        userName, userPassword,
      }) => userName === name && userPassword === pass) as IUser),
      tap(user => {
        if (user) {
          this.currentUser = user;
        } else {
          throw new Error('The username or password is incorrect');
        }
      }),
      );
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
