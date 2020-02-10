import { Delete } from './../../../shared/classes/delete';
import { TablesAdminService } from './../tables.service';
import { Component, Inject } from '@angular/core';
import { Table } from '../../../shared/models/table.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent extends Delete<Table> {
  constructor(
    public dao: TablesAdminService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {
    super(dao, dialogRef, id);
  }

}
