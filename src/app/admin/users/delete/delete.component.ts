import { UsersService } from './../users.service';
import { Delete } from './../../../shared/classes/delete';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent extends Delete<User> {
  constructor(
    public dao: UsersService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {
    super(dao, dialogRef, id);
  }

}
