import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';


@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
