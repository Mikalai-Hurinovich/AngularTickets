import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCinemaComponent } from './components/add-cinema/add-cinema.component';


@NgModule({
  declarations: [
    AdminComponent,
    AddMovieComponent,
    AddCinemaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AdminModule {
}
