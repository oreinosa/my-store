import { OrdersService } from './../orders.service';
import { Observable } from 'rxjs';
import { Order } from './../../shared/models/order.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../shared/models/product.model';
import { tap } from 'rxjs/operators';
import { ViewOrder } from 'src/app/shared/classes/view-order';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  order: Order;
  products$: Observable<Product[]>
  constructor(
    public dialogRef: MatDialogRef<ViewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    public ordersService: OrdersService
  ) {
  }

  ngOnInit(){
    this.order = this.data;
    this.products$ = this.ordersService.getOrderProducts(this.data.id);
  }

}
