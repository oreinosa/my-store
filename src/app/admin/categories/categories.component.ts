import { Component } from '@angular/core';
import { List } from '../../shared/classes/list';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from './categories.service';
import { MatDialog } from '@angular/material';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends List<Category>  {

  constructor(
    public dao: CategoriesService,
    public dialog: MatDialog
  ) {
    super(
      dao,
      dialog,
      ["name", "description", "actions"],
      AddComponent,
      UpdateComponent,
      DeleteComponent
    );
  }
}
