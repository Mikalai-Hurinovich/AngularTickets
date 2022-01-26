import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/home/components/movie-details/movie-details.component';
import { CinemaDetailsComponent } from './pages/home/components/cinema-details/cinema-details.component';
import { TokenGuard } from './core/guards/token.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movie/:id', component: MovieDetailsComponent,
  },
  {
    path: 'cinema/:id', component: CinemaDetailsComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(module => module.AdminModule),
    canActivate: [TokenGuard],
  },
  {
    path: 'user', loadChildren: () => import('./pages/authentication/authentication.module')
      .then(module => module.AuthenticationModule),
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
