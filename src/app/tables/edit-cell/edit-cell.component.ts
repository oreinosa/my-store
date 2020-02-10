import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Table } from '../../shared/models/table.model';

@Component({
  selector: 'app-edit-cell',
  templateUrl: './edit-cell.component.html',
  styleUrls: ['./edit-cell.component.scss']
})
export class EditCellComponent {
  constructor(
    public dialogRef: MatDialogRef<EditCellComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Table[]) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectTable(table: Table) {
    this.dialogRef.close(table);
  }

}
