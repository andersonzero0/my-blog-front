import { Pipe, PipeTransform } from '@angular/core';
import { formatRelative, parseISO } from 'date-fns';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: string | Date | undefined | null): string {
    if (!value) {
      return '';
    }
    try {
      const date = typeof value === 'string' ? parseISO(value) : value;
      return formatRelative(date, new Date());
    } catch (error) {
      console.error('Invalid date value for pipe:', value);
      return '';
    }
  }

}
