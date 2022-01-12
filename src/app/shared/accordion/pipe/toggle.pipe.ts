import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getToggleFunction',
})
export class TogglePipe implements PipeTransform {
  transform(i: number, toggleFn: Function) {
    return () => toggleFn(i);
  }
}
