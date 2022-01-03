import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie, MoviesService } from '../../../../core/services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie?: IMovie;

  movieSub?: Subscription;

  constructor(private readonly moviesService: MoviesService, private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.movieSub = this.moviesService.getMovie(+this.route.snapshot.params['id']).subscribe(
      (movie) => {
        this.movie = movie;
      },
    );
  }

  ngOnDestroy(): void {
    this.movieSub?.unsubscribe();
  }
}
