import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    AddMovieComponent,
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
