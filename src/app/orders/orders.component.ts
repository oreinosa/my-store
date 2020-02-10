import { ActivatedRoute } from '@angular/router';
import { ViewOrderComponent } from './view-order/view-order.component';
import { OrdersService } from './orders.service';
import { Order } from './../shared/models/order.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  displayedColumns = ["type", "guests", "waiter", "total", "createdAt", "actions"];
  dataSource = new MatTableDataSource<Order>();
  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ordersService.getActiveOrder().pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(order => {
        if (order) {
          this.onViewOrder(order);
        }
      })

    this.ordersService.getActiveOrders().pipe(
      takeUntil(this.ngUnsubscribe),
      tap(orders => console.log(orders))
    )
      .subscribe(orders => this.dataSource.data = orders);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onViewOrder(order: Order) {
    this.dialog.open(ViewOrderComponent, { data: order });
  }

}
