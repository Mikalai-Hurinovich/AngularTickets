import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appAccordionHeader]',
})
export class AccordionHeaderDirective<T> {
  constructor(public templateRef: TemplateRef<T>) {
  }
}
