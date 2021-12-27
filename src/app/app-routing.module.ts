import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieRouteActivator } from './core/services/movie-route-activator.service';
import { MovieDetailsComponent } from './shared/movie-details/movie-details.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movie/:id', component: MovieDetailsComponent, canActivate: [MovieRouteActivator],
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  declarations: [],
})

export class AppRoutingModule {
}
