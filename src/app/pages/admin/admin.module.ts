import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AdminComponent } from './admin.component';
import { AppRoutingModule } from '../../app-routing.module';


@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AdminComponent],
})
export class AdminModule {

}
