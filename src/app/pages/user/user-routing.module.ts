import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../authentication/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from '../authentication/registration/registration.component';
import { TokenGuard } from '../../core/guards/token.guard';

export const userRoutes: Routes = [
  {
    path: 'profile', component: ProfileComponent, canActivate: [TokenGuard],
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'registration', component: RegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})

export class UserRoutingModule {
}

