import { Table } from 'src/app/shared/models/table.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { DAO } from '../../shared/classes/dao';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TablesAdminService extends DAO<Table> {
  constructor(
    public af: AngularFirestore
  ) {
    super(
      af,
      "tables",
      "table"
    );
    this.collection = this.af.collection(this.collectionName, ref => ref.orderBy('label', 'asc'));
  }

}
