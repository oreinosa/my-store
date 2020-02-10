import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Table } from '../shared/models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  private gridDocument: AngularFirestoreDocument;
  constructor(
    private af: AngularFirestore
  ) {
    this.gridDocument = this.af.collection('tables').doc('layout');
  }

  getGrid() {
    return this.gridDocument.valueChanges().pipe(
      map(layout => {
        return { ...layout, grid: Object.values(layout.grid) }
      })
    );
  }

  async saveGrid(gridX: number, gridY: number, grid: {}) {
    try{
      await this.gridDocument.set({ grid, gridX, gridY });
    }catch(e){
      throw e;
    }
  }

}
