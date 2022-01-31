import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISession } from '../../models/sessions';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private readonly http: HttpClient) {
  }

  getSessions(): Observable<Array<ISession>> {
    return this.http.get('/api/sessions') as Observable<Array<ISession>>;
  }

  getSessionsByCinemaId(id: number, key: string): Observable<ISession[]> {
    return this.http.get(`/api/sessions/${key}/${id}`) as Observable<ISession[]>;
  }
}
