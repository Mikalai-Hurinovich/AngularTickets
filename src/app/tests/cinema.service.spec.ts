import { CinemaService } from '../core/services/cinema.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ICinema } from '../pages/home/components/cinema/cinema.model';
import { CINEMAS_DATA } from '../../assets/data/cinemas';
import { of } from 'rxjs';
import { asyncError } from './test-helpers';

describe('CinemaService', () => {
  let cinemaService: CinemaService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let cinemas: ICinema[];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    cinemaService = new CinemaService(httpClientSpy);
    cinemas = CINEMAS_DATA;
  });

  describe('getCinemas', () => {
    it('should return expected cinemas (HttpClient called once)', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(cinemas));

      cinemaService.getCinemas().subscribe({
        next: () => {
          expect(cinemas)
            .toEqual(cinemas);
          done();
        },
        error: done.fail,
      });

      expect(httpClientSpy.get.calls.count())
        .toBe(1);
    });

    it('should return an error when the server returns a 404', (done: DoneFn) => {
      const errorResponse = new HttpErrorResponse({
        error: 'Test 404 error',
        status: 404, statusText: 'Not Found',
      });

      httpClientSpy.get.and.returnValue(asyncError(errorResponse));

      cinemaService.getCinemas().subscribe({
        next: () => {
          done.fail('Error expected');
        },
        error: (res) => {
          expect(res.error).toContain('Test 404 error');
          done();
        },
      });
    });
  });

  describe('getCinemaById', () => {
    let cinemaId = 3;

    it('should return expected cinema (HttpClient called once)', (done: DoneFn) => {
      let currentCinema = cinemas[2];
      httpClientSpy.get.and.returnValue(of(currentCinema));

      cinemaService.getCinema(cinemaId).subscribe({
        next: () => {
          expect(currentCinema)
            .toEqual(currentCinema);
          done();
        },
        error: done.fail,
      });

      expect(httpClientSpy.get.calls.count())
        .toBe(1);
    });
    it('should call http.get with the right URL', () => {
      cinemaService.getCinema(cinemaId);
      expect(httpClientSpy.get).toHaveBeenCalledWith('/api/cinemas/3');
    });
  });

  describe('createCinema', () => {
    it('should create new cinema', () => {
      let cinema: ICinema = {
        id: 4,
        title: 'title',
        preview: 'preview',
        address: 'address',
        description: 'description',
        halls: 1,
      };

      httpClientSpy.post.and.returnValue(of(cinema));

      cinemaService.createCinema(cinema).subscribe(data => {
        expect(data).toEqual(cinema);
      });
    });
  });
});

