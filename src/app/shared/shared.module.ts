import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionModule } from './accordion/accordion.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    DropdownComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccordionModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {
}
