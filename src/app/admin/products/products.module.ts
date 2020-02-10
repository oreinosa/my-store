import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [ProductsComponent, AddComponent, UpdateComponent, DeleteComponent],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
  entryComponents: [AddComponent, UpdateComponent, DeleteComponent]
})
export class ProductsModule { }
