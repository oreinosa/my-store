import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
  declarations: [OrdersComponent, ViewOrderComponent, OrderDetailsComponent],
  imports: [
    SharedModule,
    OrdersRoutingModule
  ],
  entryComponents:[ViewOrderComponent],
  exports:[OrderDetailsComponent]
})
export class OrdersModule { }
