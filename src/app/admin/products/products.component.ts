import { ProductsService } from './products.service';
import { Component } from '@angular/core';
import { List } from '../../shared/classes/list';
import { Category } from '../../shared/models/category.model';
import { MatDialog } from '@angular/material';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends List<Category>  {

  constructor(
    public dao: ProductsService,
    public dialog: MatDialog
  ) {
    super(
      dao,
      dialog,
      ["name", "description", "price", "category", "actions"],
      AddComponent,
      UpdateComponent,
      DeleteComponent
    );
  }
}
