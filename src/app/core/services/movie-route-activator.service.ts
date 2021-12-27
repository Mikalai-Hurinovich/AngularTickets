import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { MoviesService } from '../../shared/movies.service';

@Injectable()
export class MovieRouteActivator implements CanActivate {
  constructor(private movieService: MoviesService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const eventExist = !!this.movieService.getMovie(+route.params['id']);
    if (!eventExist) {
      this.router.navigate(['404']);

      return eventExist;
    }
    return eventExist;

  }
}
