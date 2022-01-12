import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AddCinemaComponent } from './components/add-cinema/add-cinema.component';


export const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent,
  },
  {
    path: 'movie/new', component: AddMovieComponent,
  },
  {
    path: 'cinema/new', component: AddCinemaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})

export class AdminRoutingModule {

}
