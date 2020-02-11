import { Subject, Observable } from 'rxjs';
import { OrdersService } from '../../orders/orders.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { takeUntil, map, tap, switchMap, take } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/order.model';
import { Product } from 'src/app/shared/models/product.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-attend-order',
  templateUrl: './attend-order.component.html',
  styleUrls: ['./attend-order.component.scss']
})
export class AttendOrderComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  order: Order;
  id: string;
  products: Observable<Product[]>;
  addingProducts = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public ordersService: OrdersService,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntil(this.ngUnsubscribe),
      map(params => params.get('id')),
      tap(id => {
        if (!id) this.router.navigate(['/orders']);
        else this.id = id;
      }),
      switchMap(id => this.ordersService.getOrder(id)),
      take(1)
    )
      .subscribe(order => {
        console.log(order);
        this.order = order;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.ordersService.setActiveOrder(null);
  }
}
