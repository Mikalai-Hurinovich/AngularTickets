import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appAccordionContent]',
})
export class AccordionContentDirective<T> {
  constructor(public templateRef: TemplateRef<T>) {
  }
}
