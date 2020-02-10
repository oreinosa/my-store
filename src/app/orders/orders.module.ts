import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { AttendOrderComponent } from './attend-order/attend-order.component';


@NgModule({
  declarations: [OrdersComponent, ViewOrderComponent, AttendOrderComponent],
  imports: [
    SharedModule,
    OrdersRoutingModule
  ],
  entryComponents:[ViewOrderComponent]
})
export class OrdersModule { }
