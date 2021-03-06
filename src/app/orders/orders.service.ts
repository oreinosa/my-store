import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order.model';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersCollection: AngularFirestoreCollection<Order>;
  private orderDocument: AngularFirestoreDocument<Order>;
  private currentOrder = new BehaviorSubject<Order>(null);

  constructor(
    private af: AngularFirestore
  ) {
    this.ordersCollection = this.af.collection('orders');
  }

  getOrder(id: string): Observable<Order> {
    this.orderDocument = this.ordersCollection.doc(id);
    return this.orderDocument.valueChanges().pipe(
      map(order => {
        return { ...order, id }
      }));
  }

  setActiveOrder(order: Order): void {
    this.currentOrder.next(order);
  }

  getActiveOrders(limit: number = 5): Observable<Order[]> {
    // const currentTime = new Date();
    // const lastHours = new Date(currentTime.getTime() - (1000 * 60 * 180));
    this.ordersCollection = this.af
      .collection('orders', ref => ref
        .where('active', "==", true)
        .orderBy("createdAt", "desc")
        .limit(limit)
      );

    return this.ordersCollection.snapshotChanges().pipe(
      map(docs => docs.map(doc => {
        const data = doc.payload.doc.data() as Order;
        const id = doc.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getActiveOrder(id?: string): Observable<Order> {
    if (id) {
      return this.getOrder(id);
    }
    return this.currentOrder.asObservable();
  }

  getOrderProducts(id: string, limit: number = 5): Observable<Product[]> {
    this.orderDocument = this.ordersCollection.doc(id);
    return this.orderDocument.collection('products', ref => ref.orderBy('createdAt', "desc").limit(limit)).valueChanges();
  }

}
