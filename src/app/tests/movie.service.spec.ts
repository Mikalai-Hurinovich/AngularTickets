import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IMovie, MoviesService } from '../core/services/movies.service';
import { TestBed } from '@angular/core/testing';
import { MOVIES_DATA } from '../../assets/data/movies';

describe('movieService', () => {
  let mockHttp: HttpTestingController;
  let moviesService: jasmine.SpyObj<MoviesService>;
  let movies: IMovie[];

  beforeEach(() => {
    movies = MOVIES_DATA;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });

    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  describe('getMovies', () => {
    it('should return expected movies ', () => {
      moviesService.getMovies().subscribe((data: IMovie[]) => {
        expect(data.length).toEqual(3);
        expect(data).toEqual(movies);
      });

      const req = mockHttp.expectOne('/api/movies');
      expect(req.request.method).toEqual('GET');

      req.flush(movies);
    });
  });

  describe('getMovie', () => {
    let movieId = 1;
    it('should return expected movie ', () => {
      moviesService.getMovie(movieId).subscribe((data: IMovie) => {
        expect(data).toEqual(movies[0]);
      });
      const req = mockHttp.expectOne('/api/movies/1');
      expect(req.request.method).toEqual('GET');

      req.flush(movies[0]);
    });
  });

  describe('createMovie', () => {
    it('should create new movie', () => {
      const newMovie: IMovie = {
        id: 4,
        preview: 'preview',
        title: 'title',
        genre: 'genre',
        description: 'description',
      };

      moviesService.createMovie(newMovie).subscribe({
        next: (data: IMovie) => {
          expect(data).toEqual(newMovie);
        },
        error: fail,
      },
      );

      const req = mockHttp.expectOne('/api/movies/new');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newMovie);

      req.flush(newMovie);
    });
  });
});
