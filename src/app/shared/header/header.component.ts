import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { IMovie, MoviesService } from '../../core/services/movies.service';
import { CinemaService } from '../../core/services/cinema.service';
import { Subject, takeUntil } from 'rxjs';
import { ICinema } from '../../pages/home/components/cinema/cinema.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly destroy$: Subject<void> = new Subject();

  movies: Array<IMovie>;

  cinemas: Array<ICinema>;

  searchForm: FormGroup;

  searchControl: FormControl;

  constructor(
    private readonly router: Router,
    private readonly moviesService: MoviesService,
    private readonly cinemaService: CinemaService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchControl: new FormControl(),
    });

    this.moviesService.getMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.movies = data;
        this.cdr.markForCheck();
      });

    this.cinemaService.getCinemas()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.cinemas = data;
        this.cdr.markForCheck();
      });
  }
  
  handleInputData(): [{ movies: IMovie[] }, { cinemas: ICinema[] }] {
    return [{ movies: [...this.movies] }, { cinemas: [...this.cinemas] }];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleGoHome(): void {
    this.router.navigate(['']);
  }
}
