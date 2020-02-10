import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from './../auth/auth.service';
import { Order } from './../shared/models/order.model';
import { OrderService } from './order.service';
import { Table } from './../shared/models/table.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private _formBuilder: FormBuilder,
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

  // async onCreateOrder() {
  //   try {
  //     console.log('creating order');
  //     const type: string = this.firstFormGroup.get('type').value;
  //     const guests: number = this.secondFormGroup.get('guests').value;
  //     const { label: table } = this.thirdFormGroup.get('table').value;
  //     const { name: waiter } = this.authService.getCurrentUser();
  //     const { serverTimestamp } = firebase.firestore.FieldValue;
  //     console.log(waiter);
  //     const order: Order = {
  //       type,
  //       guests,
  //       table,
  //       waiter,
  //       active: true,
  //       createdAt: serverTimestamp()
  //     };
  //     console.log(order);
  //     const { id } = await this.orderService.createOrder(order);
  //     console.log('created order ', id);
  //     this.router.navigate(["/orders", id]);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

}
