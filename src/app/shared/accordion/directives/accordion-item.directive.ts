import { ContentChild, Directive, Input } from '@angular/core';
import { AccordionContentDirective } from './accordion-content.directive';
import { AccordionTitleDirective } from './accordion-title.directive';
import { AccordionHeaderDirective } from './accordion-header.directive';


@Directive({
  selector: 'accordion-item',
})
export class AccordionItemDirective<T> {
  @Input() title = '';

  @Input() disabled = false;

  @ContentChild(AccordionContentDirective) content: AccordionContentDirective<T>;

  @ContentChild(AccordionTitleDirective) customTitle: AccordionTitleDirective<T>;

  @ContentChild(AccordionHeaderDirective) customHeader: AccordionHeaderDirective<T>;
}
