import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';


export const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent,
  },
  {
    path: 'movie/new', component: AddMovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})

export class AdminRoutingModule {

}
