import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICinema } from './cinema.model';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinemaComponent {
  @Input() cinema: ICinema;
}
