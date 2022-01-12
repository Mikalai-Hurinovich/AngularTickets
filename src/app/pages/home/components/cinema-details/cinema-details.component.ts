import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ICinema } from '../cinema/cinema.model';
import { Subscription } from 'rxjs';
import { CinemaService } from '../../../../core/services/cinema.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cinema-details',
  templateUrl: './cinema-details.component.html',
  styleUrls: ['./cinema-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinemaDetailsComponent implements OnInit, OnDestroy {
  cinema?: ICinema;

  collapsing = true;

  cinemaSub: Subscription;

  constructor(
    private readonly cinemaService: CinemaService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.cinemaSub = this.cinemaService.getCinema(+this.activatedRoute.snapshot.params['id']).subscribe(
      (cinema: ICinema) => {
        this.cinema = cinema;
        this.cdr.markForCheck();
      },
    );
  }

  ngOnDestroy(): void {
    this.cinemaSub?.unsubscribe();
  }

  handleCancelClick(): void {
    this.router.navigate(['']);
  }

  handleDate(time: string): Date {
    let date = new Date();
    switch (time) {
      case 'today':
        return date;
      case 'tomorrow':
        return new Date(date.setDate(date.getDate() + 1));
      default:
        return date;
    }
  }
}
