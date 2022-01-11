import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinemasComponent {
}
