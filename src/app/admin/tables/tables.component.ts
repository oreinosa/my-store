import { Component } from '@angular/core';
import { List } from '../../shared/classes/list';
import { Table } from '../../shared/models/table.model';
import { TablesAdminService } from './tables.service';
import { MatDialog } from '@angular/material';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent extends List<Table>  {

  constructor(
    public dao: TablesAdminService,
    public dialog: MatDialog
  ) {
    super(
      dao,
      dialog,
      ["label","seats", "actions"],
      AddComponent,
      UpdateComponent,
      DeleteComponent
    );
  }
}
