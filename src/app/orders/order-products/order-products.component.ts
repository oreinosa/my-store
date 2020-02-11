import { OrdersService } from 'src/app/orders/orders.service';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../shared/models/order.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { Product } from '../../shared/models/product.model';
import { takeUntil, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @Input() order: Order;
  products$: Observable<Order[]>;
  showProducts = false;
  pageSizeSubject = new BehaviorSubject(5);
  displayedColumns = ["name", "price", "amount", "total"];

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.products$ = this.pageSizeSubject.pipe(
      switchMap(pageSize => this.ordersService.getOrderProducts(this.order.id, pageSize)),
    );
  }
}
