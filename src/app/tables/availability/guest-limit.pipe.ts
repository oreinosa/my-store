import { Table } from './../../shared/models/table.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guestLimit'
})
export class GuestLimitPipe implements PipeTransform {

  transform(table: Table, guests: number): boolean {
    return table.seats >= guests;
  }

}
