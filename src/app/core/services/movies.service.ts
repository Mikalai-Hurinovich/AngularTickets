import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { MOVIES_DATA } from '../../../assets/data/data';


export interface IMovie {
  id: number
  preview: string
  title: string
  description: string
  genre: string
}

@Injectable({ providedIn: 'root' })
export class MoviesService {
  getMovies(): Observable<Array<IMovie>> {
    return of(MOVIES_DATA);
  }

  getMovie(movieId: number): Observable<IMovie> {
    return this.getMovies()
      .pipe(map((movies: Array<IMovie>) => movies.find(({ id }) => id === movieId) as IMovie),
      );
  }

  addMovie(movie: IMovie): Observable<Observable<never>> {
    return this.getMovies()
      .pipe(map((movies) => {
        movies.push(movie);
        return EMPTY;
      },
      ));
  }
}
