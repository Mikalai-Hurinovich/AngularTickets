import { Component } from '@angular/core';

export interface IMovie {
  id: number
  preview: string
  title: string
  genre: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  movies: Array<IMovie> = [
    {
      id: 1,
      preview: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/dbfeb90f-741d-482e-aaa8-aba15c490c40/600x900',
      title: 'Spider-Man: No Way Home',
      genre: 'action, fantasy, adventure',
    }, {
      id: 2,
      preview: 'https://portal.silverscreen.by:8448/meadiaStorage/bin/system/cinema/eventsphoto/medium/7407.png',
      title: 'Реальная любовь',
      genre: 'melodrama, comedy, drama',
    }, {
      id: 3,
      preview: 'https://portal.silverscreen.by:8448/meadiaStorage/bin/system/cinema/eventsphoto/medium/7343.JPEG',
      title: 'Матрица: Воскрешение',
      genre: 'action, fantasy',
    },
  ];

}
