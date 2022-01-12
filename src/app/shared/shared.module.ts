import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionModule } from './accordion/accordion.module';


@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccordionModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class SharedModule {
}
