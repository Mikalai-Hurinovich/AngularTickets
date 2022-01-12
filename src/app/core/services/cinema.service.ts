import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { ICinema } from '../../pages/home/components/cinema/cinema.model';
import { CINEMAS_DATA } from '../../../assets/data/cinemas';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CinemaService {

  getCinemas(): Observable<ICinema[]> {
    return of(CINEMAS_DATA);
  }

  getCinema(cinemaId: number): Observable<ICinema> {
    return this.getCinemas()
      .pipe(map((cinemas: ICinema[]) => cinemas.find(({ id }) => id === cinemaId) as ICinema));
  }

  addCinema(cinema: ICinema): Observable<Observable<never>> {
    return this.getCinemas()
      .pipe(map((cinemas: ICinema[]) => {
        cinemas.push(cinema);
        return EMPTY;
      }));
  }
}
