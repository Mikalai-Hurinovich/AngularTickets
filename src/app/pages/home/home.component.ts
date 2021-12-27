import { Component, OnInit } from '@angular/core';
import { IMovie, MoviesService } from '../../shared/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  movies: Array<IMovie> | undefined;

  constructor(private readonly moviesService: MoviesService) {
  }

  ngOnInit() {
    this.movies = this.moviesService.getMovies();
  }
}
