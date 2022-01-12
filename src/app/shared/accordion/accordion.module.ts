import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionComponent } from './accordion.component';
import { AccordionItemDirective } from './directives/accordion-item.directive';
import { AccordionTitleDirective } from './directives/accordion-title.directive';
import { AccordionContentDirective } from './directives/accordion-content.directive';
import { AccordionHeaderDirective } from './directives/accordion-header.directive';
import { TogglePipe } from './pipe/toggle.pipe';


@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemDirective,
    AccordionContentDirective,
    AccordionTitleDirective,
    AccordionHeaderDirective,
    TogglePipe,
  ],
  imports: [CommonModule],
  exports: [
    AccordionComponent,
    AccordionItemDirective,
    AccordionContentDirective,
    AccordionTitleDirective,
    AccordionHeaderDirective,
  ],
})
export class AccordionModule {
}
