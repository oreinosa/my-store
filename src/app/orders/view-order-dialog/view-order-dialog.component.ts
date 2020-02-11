import { OrdersService } from './../orders.service';
import { Order } from './../../shared/models/order.model';
import { Component,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-order-dialog',
  templateUrl: './view-order-dialog.component.html',
  styleUrls: ['./view-order-dialog.component.scss']
})
export class ViewOrderDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    public ordersService: OrdersService
  ) {
  }

}
