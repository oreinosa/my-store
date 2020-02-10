import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from './../users.service';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Update } from '../../../shared/classes/update';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent extends Update<User> {

  constructor(
    public dao: UsersService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, object: User }
  ) {
    super(dao, dialogRef, data.id, data.object);
  }


}
