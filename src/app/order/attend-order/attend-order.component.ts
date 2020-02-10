import { Subject, Observable } from 'rxjs';
import { OrdersService } from '../../orders/orders.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { takeUntil, map, tap, switchMap, take } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/order.model';
import { ViewOrder } from 'src/app/shared/classes/view-order';
import { Product } from 'src/app/shared/models/product.model';
import { OrderRecord } from 'src/app/shared/models/order-record.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-attend-order',
  templateUrl: './attend-order.component.html',
  styleUrls: ['./attend-order.component.scss']
})
export class AttendOrderComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  order: Order;
  products: Observable<Product[]>;

  addingProducts = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public ordersService: OrdersService,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntil(this.ngUnsubscribe),
      map(params => params.get('id')),
      tap(id => {
        if (!id) this.router.navigate(['/orders']);
      }),
      switchMap(id => this.ordersService.getOrder(id)),
      take(1)
    )
      .subscribe(order => {
        this.order = order;
        this.products = this.ordersService.getOrderProducts(order.id);
      });


    this.orderService.getAddedRecord().pipe(
      takeUntil(this.ngUnsubscribe),
    )
      .subscribe(record => this.addRecord(record));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.ordersService.setActiveOrder(null);
  }

  async addRecord(record: OrderRecord) {
    const id = await this.orderService.addOrderRecord(this.order.id, record);
    console.log(id);
  }

}
