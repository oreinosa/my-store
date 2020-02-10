import { takeUntil } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { Table } from 'src/app/shared/models/table.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Output() selectTable = new EventEmitter<Table>();
  selectedTable: Table = null;
  private ngUnsubscribe = new Subject();
  gridDocument: AngularFirestoreDocument;
  width: number;
  grid: Table[][] = [];

  constructor(
    private dialog: MatDialog,
    private af: AngularFirestore
  ) { }

  ngOnInit() {
    this.gridDocument = this.af
      .collection('tables')
      .doc('layout');


    this.gridDocument
      .valueChanges()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((layout: any) => {
        if (layout.grid) {
          this.width = 95 / layout.gridX;
          this.grid = Object.values(layout.grid);
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelectTable(table: Table) {
    this.selectedTable = table;
    this.selectTable.emit(table);
  }

}
