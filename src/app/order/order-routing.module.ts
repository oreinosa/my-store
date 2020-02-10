import { OrderComponent } from './order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendOrderComponent } from './attend-order/attend-order.component';


const routes: Routes = [
  { path: 'order', component: OrderComponent },
  { path: "orders/:id", component: AttendOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
