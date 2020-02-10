import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogoutComponent } from './logout/logout.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, LogoutComponent, MyProfileComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  entryComponents: [LogoutComponent],
  exports: [LoginComponent]
})
export class AuthModule { }
