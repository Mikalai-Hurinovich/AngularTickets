import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie, MoviesService } from '../../core/services/movies.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AdminComponent implements OnInit {
  movies$: Observable<Array<IMovie>>;

  private _headers: Array<string> = ['Id', 'Preview', 'Title', 'Description', 'Genre'];

  get headers() {
    return this._headers;
  }

  constructor(private readonly router: Router, private readonly moviesService: MoviesService) {
  }

  ngOnInit() {
    this.movies$ = this.moviesService.getMovies();
  }

  handleAddMovie(): void {
    this.router.navigate(['admin', 'movie', 'new']);
  }
}
