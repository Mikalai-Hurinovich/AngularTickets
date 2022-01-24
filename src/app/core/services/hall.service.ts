import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHall } from '../../models/hall';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HallService {
  constructor(private readonly http: HttpClient) {
  }

  getHalls(): Observable<Array<IHall>> {
    return this.http.get('/api/halls') as Observable<Array<IHall>>;
  }

  getHallById(cinemaId: number): Observable<IHall> {
    return this.http.get(`/api/halls/${cinemaId}`) as Observable<IHall>;
  }
}
