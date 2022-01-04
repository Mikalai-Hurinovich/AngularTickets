import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  bootstrap: [AdminComponent],
})
export class AdminModule {
}
