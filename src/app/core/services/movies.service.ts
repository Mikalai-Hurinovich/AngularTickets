import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface IMovie {
  id: number
  preview: string
  title: string
  description: string
  genre: string
}

@Injectable({ providedIn: 'root' })
export class MoviesService {
  constructor(private readonly http: HttpClient) {
  }

  getMovies(): Observable<Array<IMovie>> {
    return this.http.get<IMovie[]>('/api/movies') as Observable<Array<IMovie>>;
  }

  getMovie(movieId: number): Observable<IMovie> {
    return this.http.get<IMovie>(`/api/movies/${movieId}`) as Observable<IMovie>;
  }

  createMovie(movie: IMovie): Observable<IMovie> {
    return this.http.post<IMovie>('/api/movies/new', { ...movie }) as Observable<IMovie>;
  }
}
