import { Category } from 'src/app/shared/models/category.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { DAO } from '../../shared/classes/dao';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends DAO<Category> {
  constructor(
    public af: AngularFirestore
  ) {
    super(
      af,
      "categories",
      "category"
    );
  }


}
