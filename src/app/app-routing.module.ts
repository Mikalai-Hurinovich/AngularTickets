import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/home/components/movie-details/movie-details.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movie/:id', component: MovieDetailsComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
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
