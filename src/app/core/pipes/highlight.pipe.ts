import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  transform(value: number): string | null {
    if (value < 4 && value != 0) return `Only ${value} left in stock`
    else if (value == 0) return `Out of the stock`
    return null;
  }

}
