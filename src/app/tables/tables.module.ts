import { NgModule } from '@angular/core';

import { TablesRoutingModule } from './tables-routing.module';
import { AvailabilityComponent } from './availability/availability.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { EditCellComponent } from './edit-cell/edit-cell.component';
import { GuestLimitPipe } from './availability/guest-limit.pipe';


@NgModule({
  declarations: [AvailabilityComponent, LayoutComponent, EditComponent, EditCellComponent, GuestLimitPipe],
  imports: [
    SharedModule,
    TablesRoutingModule
  ],
  entryComponents: [EditCellComponent],
  exports: [AvailabilityComponent, EditComponent]
})
export class TablesModule { }
