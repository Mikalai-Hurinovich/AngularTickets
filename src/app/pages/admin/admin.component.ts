import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie, MoviesService } from '../../core/services/movies.service';
import { Observable } from 'rxjs';
import { CinemaService } from '../../core/services/cinema.service';
import { ICinema } from '../home/components/cinema/cinema.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AdminComponent implements OnInit {
  movies$: Observable<Array<IMovie>>;

  cinemas$: Observable<Array<ICinema>>;

  private _moviesHeaders: Array<string> = ['Id', 'Preview', 'Title', 'Description', 'Genre'];

  private _cinemaHeaders: Array<string> = ['Id', 'Preview', 'Title', 'Description', 'Address'];

  get movieHeaders() {
    return this._moviesHeaders;
  }

  get cinemaHeaders() {
    return this._cinemaHeaders;
  }

  constructor(
    private readonly router: Router,
    private readonly moviesService: MoviesService,
    private readonly cinemasService: CinemaService) {
  }

  ngOnInit() {
    this.movies$ = this.moviesService.getMovies();
    this.cinemas$ = this.cinemasService.getCinemas();
  }

  handleAddMovie(): void {
    this.router.navigate(['admin', 'movie', 'new']);
  }

  handleAddCinema() {
    this.router.navigate(['admin', 'cinema', 'new']);
  }
}
