import { OrderModule } from './../order/order.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderProductsComponent } from './order-products/order-products.component';
import { ViewOrderDialogComponent } from './view-order-dialog/view-order-dialog.component';
import { AttendOrderComponent } from './attend-order/attend-order.component';


@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent, OrderProductsComponent, ViewOrderDialogComponent, AttendOrderComponent],
  imports: [
    SharedModule,
    OrderModule,
    OrdersRoutingModule
  ],
  entryComponents: [ViewOrderDialogComponent],
  exports: [OrderDetailsComponent, OrderProductsComponent]
})
export class OrdersModule { }
