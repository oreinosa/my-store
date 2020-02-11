import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Order } from './../shared/models/order.model';
import { OrderService } from './order.service';
import { Table } from './../shared/models/table.model';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  isLinear = false;
  order: Order;
  selectedTable: Table;
  showTable = false;
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.order = {
      guests: 2,
      type: "In",
      status: "New",
      active: true,
      total: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
  }

  ngOnInit() {
  }

  async onCreateOrder(order: Order) {
    try {
      order.waiter = this.authService.getCurrentUser().name;
      const id = await this.orderService.createOrder(order);
      console.log('created order ', id);
      this.router.navigate(['/orders']);
    } catch (e) {
      console.log(e);
    }
  }

}
