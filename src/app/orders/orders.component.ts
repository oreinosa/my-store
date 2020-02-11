import { ActivatedRoute, Router } from '@angular/router';
import { ViewOrderDialogComponent } from './view-order-dialog/view-order-dialog.component';
import { OrdersService } from './orders.service';
import { Order } from './../shared/models/order.model';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, tap, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  displayedColumns = ["type", "guests", "waiter", "total", "createdAt", "actions"];
  dataSource = new MatTableDataSource<Order>();
  orders: Order[] = [];
  orders$: Observable<Order[]>;
  pageSizeSubject = new BehaviorSubject(5);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.orders$ = this.pageSizeSubject.pipe(
      takeUntil(this.ngUnsubscribe),
      switchMap(pageSize => this.ordersService.getActiveOrders(pageSize)),
      takeUntil(this.ngUnsubscribe),
      tap(orders => {
        console.log(orders);
        this.orders = orders;
        this.dataSource.data = orders;
      })
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onViewOrder(order: Order) {
    this.dialog.open(ViewOrderDialogComponent, { data: order, maxWidth: "800px", minWidth: "300px" });
  }

  onAttendOrder(order: Order) {
    this.ordersService.setActiveOrder(order);
    this.router.navigate(['/orders', order.id]);
  }

}
