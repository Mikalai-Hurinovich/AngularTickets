import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie, MoviesService } from '../../../../core/services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie?: IMovie;

  movieSub?: Subscription;

  constructor(
    private readonly moviesService: MoviesService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.movieSub = this.moviesService.getMovie(+this.route.snapshot.params['id']).subscribe(
      (movie) => {
        this.movie = movie;
        this.cdr.markForCheck();
      },
    );
  }

  ngOnDestroy(): void {
    this.movieSub?.unsubscribe();
  }
}
