import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMovie } from '../../../../core/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  @Input() movie?: IMovie;
}
