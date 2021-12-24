import { Component, Input } from '@angular/core';
import { IMovie } from '../../../../core/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent {

  @Input() movie?: IMovie;

}
