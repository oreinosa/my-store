import { Observable } from 'rxjs';
import { CategoriesService } from './../../categories/categories.service';
import { Component } from '@angular/core';
import { Add } from '../../../shared/classes/add';
import { MatDialogRef } from '@angular/material';
import { Category } from '../../../shared/models/category.model';
import { Product } from '../../../shared/models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent extends Add<Product>{
  object = new Product();
  categories: Observable<Category[]>;
  constructor(
    public dao: ProductsService,
    public categoriesDao: CategoriesService,
    public dialogRef: MatDialogRef<AddComponent>,
  ) {
    super(dao, dialogRef);
    this.categories = this.categoriesDao.getAll();
  }
}
