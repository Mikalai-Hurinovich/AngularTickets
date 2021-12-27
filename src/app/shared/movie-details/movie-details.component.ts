import { Component, OnInit } from '@angular/core';
import { IMovie, MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: IMovie | undefined;

  constructor(private readonly moviesService: MoviesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.movie = this.moviesService.getMovie(+this.route.snapshot.params['id']);
  }
}
