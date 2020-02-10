import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [UsersComponent, AddComponent, UpdateComponent, DeleteComponent],
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  entryComponents: [AddComponent, UpdateComponent, DeleteComponent]
})
export class UsersModule { }
