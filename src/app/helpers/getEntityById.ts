import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


export function getEntityById<T>(getData: () => Observable<Array<T>>, entityId: number): Observable<T> {
  return getData()
  // @ts-ignore
    .pipe(map((halls: Array<T>) => halls.find(({ id }) => id === entityId) as T),
    );
}
