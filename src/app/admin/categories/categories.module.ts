import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [CategoriesComponent, AddComponent, UpdateComponent, DeleteComponent],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ],
  entryComponents: [AddComponent, UpdateComponent, DeleteComponent]
})
export class CategoriesModule { }
