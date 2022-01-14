import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SESSIONS_DATA } from '../../../assets/data/sessions';
import { ISession } from '../../models/sessions';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SessionService {
  getSessions(): Observable<Array<ISession>> {
    return of(SESSIONS_DATA);
  }

  getSessionsById(id: number, key: string): Observable<ISession[]> {
    return this.getSessions()
    // @ts-ignore
      .pipe(map((sessions: Array<ISession>) => sessions.filter((session) => session[key].id === id)) as ISession,
      );
  }
}
