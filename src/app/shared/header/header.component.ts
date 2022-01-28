import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie, MoviesService } from '../../core/services/movies.service';
import { CinemaService } from '../../core/services/cinema.service';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { ICinema } from '../../pages/home/components/cinema/cinema.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  movies$: Observable<IMovie[]>;

  cinemas$: Observable<ICinema[]>;

  searchDatabase: [{ movies: IMovie[] }, { cinemas: ICinema[] }];

  constructor(
    private readonly router: Router,
    private readonly moviesService: MoviesService,
    private readonly cinemaService: CinemaService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.movies$ = this.moviesService.getMovies()
      .pipe(takeUntil(this.destroy$));

    this.cinemas$ = this.cinemaService.getCinemas()
      .pipe(takeUntil(this.destroy$));

    combineLatest([this.movies$, this.cinemas$])
      .subscribe(([movies, cinemas]) => {
        this.searchDatabase = [{ movies: [...movies] }, { cinemas: [...cinemas] }];
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleGoHome(): void {
    this.router.navigate(['']);
  }
}
