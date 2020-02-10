import { Delete } from './../../../shared/classes/delete';
import { CategoriesService } from './../categories.service';
import { Component, Inject } from '@angular/core';
import { Category } from '../../../shared/models/category.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent extends Delete<Category> {
  constructor(
    public dao: CategoriesService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {
    super(dao, dialogRef, id);
  }

}
