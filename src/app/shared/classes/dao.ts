import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class DAO<T> {
  collection: AngularFirestoreCollection<T>;
  document: AngularFirestoreDocument<T>;

  constructor(
    public af: AngularFirestore,
    public collectionName: string,
    public documentName: string
  ) {
    this.collection = this.af.collection<T>(this.collectionName);
  }

  getAll(query?: any): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return Object.assign({ id }, data);
      })));
  }

  getOne(id: string): Observable<T> {
    this.document = this.collection.doc(id);
    return this.document.snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data();
        const id = action.payload.id;
        return Object.assign({ id }, data);
      }));
  }

  async create(doc: T): Promise<string> {
    try {
      const { id } = await this.collection.add(doc);
      return id;
    } catch (e) {
      throw e
    }
  }

  update(id: string, newDoc?: T): Promise<void> {
    try {
      this.document = this.collection.doc(id);
      return this.document.update(newDoc);
    } catch (e) {
      throw e
    }
  }

  delete(id: string): Promise<void> {
    try {
      this.document = this.collection.doc(id);
      return this.document.delete();
    } catch (e) {
      throw e
    }
  }

}
