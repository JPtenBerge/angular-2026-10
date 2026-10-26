import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'euro' })
export class EuroPipe implements PipeTransform {
  transform(value: number | undefined | null) {
    // GIGO
    if (value === undefined || value === null) return value;

    let str = value.toString();
    let [wholes, decimals] = str.split('.');

    return `€ ${wholes},${decimals.padEnd(2, '0')}`;
  }
}
