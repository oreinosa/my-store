import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [NavigationComponent, HomeComponent],
  imports: [
    SharedModule,
    AuthModule,
    CoreRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  exports: [NavigationComponent]
})
export class CoreModule { }
