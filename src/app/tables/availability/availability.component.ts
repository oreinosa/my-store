import { TablesService } from './../tables.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Table } from 'src/app/shared/models/table.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  @Output() selectTable = new EventEmitter<Table>();
  @Input() guests = 1;
  selectedTable: Table = null;
  private ngUnsubscribe = new Subject();
  width: number;
  grid: Table[][] = [];

  constructor(
    private dialog: MatDialog,
    private tables: TablesService
  ) { }

  ngOnInit() {
    this.tables.getGrid()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((layout: any) => {
        if (layout.grid) {
          console.log(layout);
          this.width = 95 / layout.gridX;
          this.grid = layout.grid;
          // .map(row => row.filter(table => table.seats >= this.guests));
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelectTable(table: Table) {
    if (table.seats >= this.guests) {
      this.selectedTable = table;
      this.selectTable.emit(table);
    }
  }

}
