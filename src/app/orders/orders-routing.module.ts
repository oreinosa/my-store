import { AttendOrderComponent } from './../order/attend-order/attend-order.component';
import { OrdersComponent } from './orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "orders", component: OrdersComponent, children: [
      { path: ":id", component: AttendOrderComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
