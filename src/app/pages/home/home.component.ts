import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IMovie, MoviesService } from '../../core/services/movies.service';
import { Observable } from 'rxjs';
import { CinemaService } from '../../core/services/cinema.service';
import { ICinema } from './components/cinema/cinema.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeComponent implements OnInit {
  movies$?: Observable<Array<IMovie>>;

  cinemas$?: Observable<ICinema[]>;

  constructor(public readonly moviesService: MoviesService, private readonly cinemaService: CinemaService) {
  }

  ngOnInit() {
    this.movies$ = this.moviesService.getMovies();
    this.cinemas$ = this.cinemaService.getCinemas();
  }
}
