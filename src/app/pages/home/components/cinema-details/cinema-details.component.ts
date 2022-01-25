import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ICinema } from '../cinema/cinema.model';
import { Subject, takeUntil } from 'rxjs';
import { CinemaService } from '../../../../core/services/cinema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../../core/services/session.service';
import { IGroupedSessions } from '../../../../models/sessions';
import { groupCinemaSessionsByDate } from '../../../../helpers/group-cinema-sessions-by-date';
import { MoviesService } from '../../../../core/services/movies.service';

@Component({
  selector: 'app-cinema-details',
  templateUrl: './cinema-details.component.html',
  styleUrls: ['./cinema-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinemaDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  cinema: ICinema;

  groupedSessionsByDate: IGroupedSessions[];

  collapsing = true;

  constructor(
    private readonly cinemaService: CinemaService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sessionService: SessionService,
    private readonly movieService: MoviesService,
    private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.cinemaService.getCinema(+this.activatedRoute.snapshot.params['id'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (cinema: ICinema) => {
          this.cinema = cinema;
          this.cdr.markForCheck();
        },
      );

    this.sessionService.getSessionsById(+this.activatedRoute.snapshot.params['id'], 'cinema')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.groupedSessionsByDate = groupCinemaSessionsByDate(data);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleCancelClick(): void {
    this.router.navigate(['']);
  }
}
