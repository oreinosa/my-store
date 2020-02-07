import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, LogoutComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  entryComponents: [LoginComponent, RegisterComponent, ResetPasswordComponent]
})
export class AuthModule { }
