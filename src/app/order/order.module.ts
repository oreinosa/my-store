import { TablesModule } from './../tables/tables.module';
import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material';
import { AttendOrderComponent } from './attend-order/attend-order.component';
import { OrdersModule } from '../orders/orders.module';
import { AddProductsComponent } from './add-products/add-products.component';
import { AddProductComponent } from './add-products/add-product/add-product.component';
import { ProductCategoriesComponent } from './add-products/product-categories/product-categories.component';
import { AddedProductsComponent } from './added-products/added-products.component';


@NgModule({
  declarations: [OrderComponent, AttendOrderComponent, AddProductsComponent, AddProductComponent, ProductCategoriesComponent, AddedProductsComponent],
  imports: [
    SharedModule,
    TablesModule,
    OrdersModule,
    MatStepperModule,
    OrderRoutingModule
  ],
  exports: [AttendOrderComponent]
})
export class OrderModule { }
