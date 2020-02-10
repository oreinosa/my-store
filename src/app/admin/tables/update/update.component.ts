import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TablesAdminService } from './../tables.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Table } from '../../../shared/models/table.model';
import { Update } from '../../../shared/classes/update';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent extends Update<Table> {

  constructor(
    public dao: TablesAdminService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, object: Table }
  ) {
    super(dao, dialogRef, data.id, data.object);
  }


}
