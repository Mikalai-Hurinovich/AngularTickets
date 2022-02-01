import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie, MoviesService } from '../../../../core/services/movies.service';
import { Subject, takeUntil } from 'rxjs';
import { SessionService } from '../../../../core/services/session.service';
import { IGroupedSessions } from '../../../../models/sessions';
import { groupCinemaSessionsByDate } from '../../../../helpers/group-cinema-sessions-by-date';
import { CinemaService } from '../../../../core/services/cinema.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  movie: IMovie;

  groupCinemaSessionsByDate: IGroupedSessions[];

  collapsing = true;

  constructor(
    private readonly moviesService: MoviesService,
    private readonly cinemaService: CinemaService,
    private readonly route: ActivatedRoute,
    private readonly sessionService: SessionService,
    private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.moviesService.getMovie(+this.route.snapshot.params['id'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (movie) => {
          this.movie = movie;
          this.cdr.markForCheck();
        },
      );

    this.sessionService.getSessionsByCinemaId(+this.route.snapshot.params['id'], 'movie')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.groupCinemaSessionsByDate = groupCinemaSessionsByDate(data);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
