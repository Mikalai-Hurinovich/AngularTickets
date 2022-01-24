import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICinema } from '../../pages/home/components/cinema/cinema.model';

@Injectable({ providedIn: 'root' })
export class CinemaService {

  constructor(private readonly http: HttpClient) {
  }

  getCinemas(): Observable<ICinema[]> {
    return this.http.get('/api/cinemas') as Observable<ICinema[]>;
  }

  getCinema(cinemaId: number): Observable<ICinema> {
    return this.http.get(`/api/cinemas/${cinemaId}`) as Observable<ICinema>;
  }

  createCinema(cinema: ICinema): Observable<ICinema> {
    return this.http.post('/api/cinemas/new', { ...cinema }) as Observable<ICinema>;
  }
}
