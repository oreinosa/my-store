import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order.model';
import { OrdersService } from '../orders/orders.service';
import { Product } from '../shared/models/product.model';
import { take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { OrderRecord } from '../shared/models/order-record.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersCollectioName = 'orders';
  private productsCollectioName = 'products';
  private categoriesCollectioName = 'categories';
  private ordersCollection: AngularFirestoreCollection<Order>;
  private productsCollection: AngularFirestoreCollection<Product>;
  private categoriesCollection: AngularFirestoreCollection<Category>;

  private addRecordSubject = new Subject<OrderRecord>();

  constructor(
    private af: AngularFirestore,
    private orders: OrdersService
  ) {
    this.ordersCollection = this.af.collection(this.ordersCollectioName);
    this.productsCollection = this.af.collection(this.productsCollectioName, ref => ref.limit(25));
    this.categoriesCollection = this.af.collection(this.categoriesCollectioName);
  }

  async createOrder(order: Order) {
    try {
      const { id } = await this.ordersCollection.add(order);
      this.orders.setActiveOrder({ ...order, id });
      return id;
    } catch (e) {
      throw e;
    }
  }

  addRecord(record: OrderRecord) {
    this.addRecordSubject.next(record);
  }

  getAddedRecord() {
    return this.addRecordSubject.asObservable();
  }

  async addOrderRecord(orderId: string, record: OrderRecord) {
    try {
      const { id } = await this.ordersCollection.doc(orderId).collection(this.productsCollectioName).add(record);
      return id;
    } catch (e) {
      throw e;
    }
  }

  addOrderRecords(orderId: string, records: OrderRecord[]): Promise<void> {
    const batch = this.af.firestore.batch();
    let doc: DocumentReference;
    for (let record of records) {
      doc = this.ordersCollection.doc<Order>(orderId).collection<Product>(this.productsCollectioName).doc(this.af.createId()).ref;
      batch.set(doc, record);
    }
    // run HTTP function to update total 
    return batch.commit();
  }

  getProducts(category: string = "All"): Observable<Product[]> {
    if (category !== "All") {
      this.productsCollection = this.af.collection(this.productsCollectioName, ref => ref.where("category", "==", category).limit(25));
    } else {
      this.productsCollection = this.af.collection(this.productsCollectioName, ref => ref.limit(25));
    }
    return this.productsCollection.valueChanges().pipe(take(1));
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesCollection.valueChanges().pipe(take(1));
  }
}
