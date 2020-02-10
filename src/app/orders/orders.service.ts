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

  getActiveOrder(): Observable<Order> {
    return this.currentOrder.asObservable();
  }

  setActiveOrder(order: Order): void {
    this.currentOrder.next(order);
  }

  getActiveOrders(): Observable<Order[]> {
    // const currentTime = new Date();
    // const lastHours = new Date(currentTime.getTime() - (1000 * 60 * 180));
    this.ordersCollection = this.af
      .collection('orders', ref => ref
        .where('active', "==", true)
        .orderBy("createdAt", "desc")
      );

    return this.ordersCollection.snapshotChanges().pipe(
      map(docs => docs.map(doc => {
        const data = doc.payload.doc.data() as Order;
        const id = doc.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getOrder(): Observable<Order> {
    return null;
  }

  getOrderProducts(id: string): Observable<Product[]> {
    this.orderDocument = this.ordersCollection.doc(id);
    return this.orderDocument.collection('products').valueChanges();
  }

}
