import { CategoriesService } from './../categories.service';
import { Component } from '@angular/core';
import { Add } from '../../../shared/classes/add';
import { Category } from '../../../shared/models/category.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent extends Add<Category>{
  object = new Category();
  constructor(
    public dao: CategoriesService,
    public dialogRef: MatDialogRef<AddComponent>,
  ) {
    super(dao,dialogRef);
  }
}
