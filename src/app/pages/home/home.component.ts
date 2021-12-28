import { Component, OnInit } from '@angular/core';
import { IMovie, MoviesService } from '../../core/services/movies.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  movies$?: Observable<Array<IMovie>>;

  constructor(public readonly moviesService: MoviesService) {
  }

  ngOnInit() {
    this.movies$ = this.moviesService.getMovies();
  }
}
