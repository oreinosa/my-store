import { TablesModule } from './../tables/tables.module';
import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material';


@NgModule({
  declarations: [OrderComponent],
  imports: [
    SharedModule,
    TablesModule,
    MatStepperModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
