import { OrdersService } from './../orders.service';
import { Observable } from 'rxjs';
import { Order } from './../../shared/models/order.model';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../shared/models/product.model';
import { tap } from 'rxjs/operators';
import { ViewOrder } from 'src/app/shared/classes/view-order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  @Input() order: Order;
  constructor(
  ) {
  }


}
