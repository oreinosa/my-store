import { TablesService } from './../tables.service';
import { takeUntil } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EditCellComponent } from './../edit-cell/edit-cell.component';
import { MatDialog } from '@angular/material';
import { Table } from 'src/app/shared/models/table.model';
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { collectExternalReferences } from '@angular/compiler';

@Component({
  selector: 'app-edit-layout',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @Input() tables: Table[];
  availableTables: Table[] = [];
  gridX = 10;
  width: number;
  gridY = 10;
  grid: Table[][] = [];

  constructor(
    private dialog: MatDialog,
    private tablesService: TablesService
  ) { }

  ngOnInit() {
    this.generateGrid();


    this.availableTables = this.tables;

    this.tablesService.getGrid()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((layout: any) => {
        if (layout.grid) {
          this.gridX = layout.gridX;
          this.gridY = layout.gridY;
          this.grid = Object.values(layout.grid);
          this.availableTables = this.tables;
          this.grid.forEach(row => {
            row.forEach(col => {
              if (col !== "") {
                const index = this.availableTables.findIndex(table => table.label === col.label);
                if (index > -1) this.availableTables.splice(index, 1);
              }
            });
          });
        } else {
          this.generateGrid();
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  generateGrid() {
    this.width = 95 / this.gridX;
    let grid = new Array(this.gridY);
    for (let i = 0; i < this.gridY; i++) {
      grid[i] = new Array(this.gridX);
    }
    this.grid = grid;
    this.availableTables = this.tables;
  }

  onSelectCell(x: number, y: number, old: Table) {
    const ref = this.dialog.open(EditCellComponent, { data: this.availableTables });
    ref.afterClosed().subscribe((selected: Table) => {
      if (selected) {
        const index = this.availableTables.findIndex(table => table === selected);
        if (index > -1) this.availableTables.splice(index, 1);
        if (old) {
          this.availableTables.push(old);
        }
        this.grid[y][x] = selected === "None" ? null : selected;
      }
    })
  }

  toObject(arr) {
    var rv = {};
    for (let i = 0; i < arr.length; ++i) {
      rv[i] = arr[i];
      for (let k = 0; k < arr[i].length; k++) {
        rv[i][k] = arr[i][k] ? arr[i][k] : "";
      }
    }
    return rv;
  }


  async onSave() {
    try {
      await this.tablesService.saveGrid(this.gridX, this.gridY, this.toObject(this.grid))
    } catch (e) {
      console.log(e);
    }
  }

}
