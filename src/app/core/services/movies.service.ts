import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { JSON_URL } from '../constants/constants';
import { Observable } from 'rxjs';

export interface IMovie {
  id: number
  preview: string
  title: string
  description: string
  genre: string
}

@Injectable({ providedIn: 'root' })
export class MoviesService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getMovies(): Observable<Array<IMovie>> {
    return this.httpClient.get(JSON_URL)
      .pipe(tap(console.log),
        map(res => res as Array<IMovie>));
  }

  getMovie(movieId: number): Observable<IMovie> {
    return this.getMovies()
      .pipe(tap(console.log),
        map((movies: Array<IMovie>) => movies.find(({ id }) => id === movieId) as IMovie),
      );
  }
}
