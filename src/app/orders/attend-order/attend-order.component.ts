import { Subject, Observable } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-attend-order',
  templateUrl: './attend-order.component.html',
  styleUrls: ['./attend-order.component.scss']
})
export class AttendOrderComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @Input() order: Order;
  @Output() attendedEmitter = new EventEmitter();
  id: string;
  products: Observable<Product[]>;
  addingProducts = false;

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
