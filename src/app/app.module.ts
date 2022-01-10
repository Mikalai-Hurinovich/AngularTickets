import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {
  NotFoundBackgroundComponent,
} from './pages/not-found/components/not-found-background/not-found-background.component';
import { UserModule } from './pages/user/user.module';
import { HomeModule } from './pages/home/home.module';
import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './pages/authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './pages/admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NotFoundBackgroundComponent,
  ],
  imports: [
    HomeModule,
    CoreModule,
    UserModule,
    SharedModule,
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    AuthenticationModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
