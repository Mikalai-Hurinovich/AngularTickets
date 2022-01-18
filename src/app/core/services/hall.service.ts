import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ALL_CINEMAS_HALLS } from '../../../assets/data/halls';
import { IHall } from '../../models/hall';
import { getEntityById } from '../../helpers/getEntityById';

@Injectable({ providedIn: 'root' })
export class HallService {
  getHalls(): Observable<Array<IHall>> {
    return of(ALL_CINEMAS_HALLS);
  }

  getHallById(cinemaId: number): Observable<IHall> {
    return getEntityById(this.getHalls, cinemaId);
  }
}
