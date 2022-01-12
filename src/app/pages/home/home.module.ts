import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MovieComponent } from './components/movie/movie.component';
import { SharedModule } from '../../shared/shared.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CinemasComponent } from './components/cinemas/cinemas.component';


@NgModule({
  declarations: [
    HomeComponent,
    MovieComponent,
    CinemasComponent,
    MovieDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [HomeComponent],
  exports: [],
})
export class HomeModule {
}
