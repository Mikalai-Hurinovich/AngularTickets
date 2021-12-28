import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './pages/home/home.module';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {
  NotFoundBackgroundComponent,
} from './pages/not-found/components/not-found-background/not-found-background.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    AdminComponent,
    NotFoundComponent,
    NotFoundBackgroundComponent,
  ],
  imports: [
    HomeModule,
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
