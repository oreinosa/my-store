import { ActivatedRoute, Router } from '@angular/router';
import { ViewOrderDialogComponent } from './view-order-dialog/view-order-dialog.component';
import { OrdersService } from './orders.service';
import { Order } from './../shared/models/order.model';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, tap, map, switchMap, take } from 'rxjs/operators';

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

  currentOrder$: Observable<Order>;

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

    this.currentOrder$ = this.route.paramMap.pipe(
      takeUntil(this.ngUnsubscribe),
      map(params => params.get('id')),
      switchMap(id => this.ordersService.getActiveOrder(id)),
      tap(order => console.log(order))
    );

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.ordersService.setActiveOrder(null);
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
