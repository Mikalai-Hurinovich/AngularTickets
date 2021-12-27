import { Injectable } from '@angular/core';

export interface IMovie {
  id: number
  preview: string
  title: string
  genre: string
  description: string
}

@Injectable()
export class MoviesService {
  getMovies(): Array<IMovie> {
    return this.movies;
  }

  getMovie(id: number): IMovie | undefined {
    return this.movies.find(movie => movie.id === id);
  }

  movies: Array<IMovie> = [
    {
      id: 1,
      preview: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/dbfeb90f-741d-482e-aaa8-aba15c490c40/600x900',
      title: 'Spider-Man: No Way Home',
      genre: 'action, fantasy, adventure',
      description: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.',
    }, {
      id: 2,
      preview: 'https://portal.silverscreen.by:8448/meadiaStorage/bin/system/cinema/eventsphoto/medium/7407.png',
      title: 'Love Actually',
      genre: 'melodrama, comedy, drama',
      description: 'Follows the lives of eight very different couples in dealing with their love lives in various loosely interrelated tales all set during a frantic month before Christmas in London, England.',
    }, {
      id: 3,
      preview: 'https://portal.silverscreen.by:8448/meadiaStorage/bin/system/cinema/eventsphoto/medium/7343.JPEG',
      title: 'Matrix 4',
      genre: 'action, fantasy',
      description: 'Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a construct, to truly know himself, Mr. Anderson will have to choose to follow the white rabbit once more.',
    },
  ];
}
