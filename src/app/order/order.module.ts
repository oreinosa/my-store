import { TablesModule } from './../tables/tables.module';
import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material';
import { AddProductsComponent } from './add-products/add-products.component';
import { AddProductComponent } from './add-products/add-product/add-product.component';
import { ProductCategoriesComponent } from './add-products/product-categories/product-categories.component';
import { AddedProductsComponent } from './added-products/added-products.component';


@NgModule({
  declarations: [OrderComponent, AddProductsComponent, AddProductComponent, ProductCategoriesComponent, AddedProductsComponent],
  imports: [
    SharedModule,
    TablesModule,
    MatStepperModule,
    OrderRoutingModule
  ],
  exports: [AddedProductsComponent, AddProductsComponent]
})
export class OrderModule { }
