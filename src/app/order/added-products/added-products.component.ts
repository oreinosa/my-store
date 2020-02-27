import { takeUntil, tap } from 'rxjs/operators';
import { OrderService } from './../order.service';
import { OrderRecord } from './../../shared/models/order-record.model';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-added-products',
  templateUrl: './added-products.component.html',
  styleUrls: ['./added-products.component.scss']
})
export class AddedProductsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  orderRecords: OrderRecord[] = [];
  @Input() id: string;
  displayedColumns = ["name", "price", "amount", "total"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  addingProducts = false;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    console.log(this.id);
    this.orderService.getAddedRecords().pipe(
      takeUntil(this.ngUnsubscribe),
      tap(console.log)
    )
      .subscribe(orderRecords => this.orderRecords = orderRecords)
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  async addRecords() {
    try {
      this.addingProducts = true;
      await this.orderService.addOrderRecords(this.id, this.orderRecords);
      this.addingProducts = false;
    } catch (e) {
      console.log(e);
    }
  }

}
