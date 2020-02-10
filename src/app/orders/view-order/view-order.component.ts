import { OrdersService } from './../orders.service';
import { Observable } from 'rxjs';
import { Order } from './../../shared/models/order.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../shared/models/product.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  products$: Observable<Product[]>
  displayedColumns = ["name", "price", "amount", "total"];
  constructor(
    public dialogRef: MatDialogRef<ViewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private ordersService: OrdersService
  ) { }


  ngOnInit() {
    this.products$ = this.ordersService.getOrderProducts(this.data.id).pipe(tap(products => console.log));
  }

}
