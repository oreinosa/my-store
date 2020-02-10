import { TablesModule } from './../../tables/tables.module';
import { NgModule } from '@angular/core';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [TablesComponent, AddComponent, UpdateComponent, DeleteComponent],
  imports: [
    SharedModule,
    TablesModule,
    TablesRoutingModule
  ],
  entryComponents: [AddComponent, UpdateComponent, DeleteComponent]
})
export class TablesAdminModule { }
