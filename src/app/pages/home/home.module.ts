import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../../app-routing.module';
import { HomeComponent } from './home.component';
import { MovieComponent } from './components/movie/movie.component';
import { SharedModule } from '../../shared/shared.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    MovieComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [HomeComponent],
  exports: [
    HomeComponent,
  ],
})
export class HomeModule {
}
