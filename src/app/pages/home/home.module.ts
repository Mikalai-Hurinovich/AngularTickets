import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MovieComponent } from './components/movie/movie.component';
import { SharedModule } from '../../shared/shared.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CinemaComponent } from './components/cinema/cinema.component';
import { CinemaDetailsComponent } from './components/cinema-details/cinema-details.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';


@NgModule({
  declarations: [
    HomeComponent,
    MovieComponent,
    CinemaComponent,
    MovieDetailsComponent,
    CinemaDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AccordionModule,
  ],
  providers: [],
  bootstrap: [HomeComponent],
  exports: [],
})
export class HomeModule {
}
