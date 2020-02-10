import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order.model';
import { OrdersService } from '../orders/orders.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private collectionName = 'orders';
  constructor(
    private af: AngularFirestore,
    private orders: OrdersService
  ) { }

  async createOrder(order: Order) {
    try {
      const { id } = await this.af.collection(this.collectionName).add(order);
      this.orders.setActiveOrder({ ...order, id });
      return id;
    } catch (e) {
      throw e;
    }
  }
}
