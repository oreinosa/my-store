import { ProductsService } from './../products.service';
import { Delete } from './../../../shared/classes/delete';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent extends Delete<Product> {
  constructor(
    public dao: ProductsService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {
    super(dao, dialogRef, id);
  }

}
