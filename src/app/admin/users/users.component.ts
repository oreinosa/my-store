import { UsersService } from './users.service';
import { User } from './../../shared/models/user.model';
import { Component } from '@angular/core';
import { List } from '../../shared/classes/list';
import { MatDialog } from '@angular/material';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends List<User>  {

  constructor(
    public dao: UsersService,
    public dialog: MatDialog
  ) {
    super(
      dao,
      dialog,
      ["name", "email", "role", "actions"],
      AddComponent,
      UpdateComponent,
      DeleteComponent
    );
  }
}
