import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { ButtonComponent } from './button/button.component';


@NgModule({
  declarations: [
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [
    ButtonComponent,
  ],
})
export class SharedModule {

}
