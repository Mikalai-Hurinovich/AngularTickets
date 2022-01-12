import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { AccordionItemDirective } from './directives/accordion-item.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('contentExpansion', [
      state('expanded', style({ height: '*', opacity: 1, visibility: 'visible' })),
      state('collapsed', style({ height: '0px', opacity: 0, visibility: 'hidden' })),
      transition('expanded <=> collapsed',
        animate('2000ms cubic-bezier(.37,1.04,.68,.98)')),
    ]),
  ],
})
export class AccordionComponent<T> {
  expanded = new Set<number>();

  @Input() collapsing = true;

  @ContentChildren(AccordionItemDirective) items: QueryList<AccordionItemDirective<T>>;

  toggleState = (index: number): void => {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      if (this.collapsing) {
        this.expanded.clear();
      }
      this.expanded.add(index);
    }
  };
}
