import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie, MoviesService } from '../../../../core/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie?: IMovie;

  constructor(private readonly moviesService: MoviesService, private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.moviesService.getMovie(+this.route.snapshot.params['id']).subscribe(
      (movie) => {
        this.movie = movie;
      },
    );

  }
}
