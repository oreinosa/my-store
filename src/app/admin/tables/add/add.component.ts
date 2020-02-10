import { TablesAdminService } from './../tables.service';
import { Component } from '@angular/core';
import { Add } from '../../../shared/classes/add';
import { Table } from '../../../shared/models/table.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent extends Add<Table>{
  object = new Table();
  constructor(
    public dao: TablesAdminService,
    public dialogRef: MatDialogRef<AddComponent>,
  ) {
    super(dao,dialogRef);
  }
}
