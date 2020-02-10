import { ProductsService } from './../products.service';
import { Product } from './../../../shared/models/product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component,  Inject } from '@angular/core';
import { Category } from '../../../shared/models/category.model';
import { Update } from '../../../shared/classes/update';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent extends Update<Product> {

  constructor(
    public dao: ProductsService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, object: Category }
  ) {
    super(dao, dialogRef, data.id, data.object);
  }


}
