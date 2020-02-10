import { Product } from './../../shared/models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { DAO } from '../../shared/classes/dao';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends DAO<Product> {
  constructor(
    public af: AngularFirestore
  ) {
    super(
      af,
      "products",
      "product"
    );
  }


}
