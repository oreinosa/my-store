import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, tap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { LogoutComponent } from 'src/app/auth/logout/logout.component';
import { Routes } from '../../auth/routes';
import { ResetPasswordComponent } from '../../auth/reset-password/reset-password.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  user: User = null;
  screenSize = 4;
  routes: Routes = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog
  ) {

    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(
        map(result => {
          switch (true) {
            case this.breakpointObserver.isMatched('(max-width: 599.99px)'):
              // mobile screen
              return 1;
            case this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 959.99px)'):
              // table screen
              return 2;
            case this.breakpointObserver.isMatched('(min-width: 960px) and (max-width: 1279.99px)'):
              // pc screen
              return 3;
            default:
              // big pc screen
              return 4;
          }
        }))
      .subscribe(result => {
        console.log(result);
        this.screenSize = result;
      });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.auth.getUser().pipe(
      tap((user: User) => {
        console.log("Logged in : ", user);
      }))
      .subscribe(user => this.user = user);

    this.auth.getRoutes().subscribe(routes => this.routes = routes);
  }

  openDialog(componentName: string) {
    let component = null;
    switch (componentName) {
      case "logout":
        component = LogoutComponent;
        break;
      case "reset-password":
        component = ResetPasswordComponent;
        break;
    }

    if (component) {
      const dialogRef = this.dialog.open(component,
        {
          minWidth: '250px',
          maxWidth: "500px"
        }
      );
      dialogRef.afterClosed().subscribe(result => {
        setTimeout(() => {
          console.log('The dialog was closed');
          if (result !== "") this.openDialog(result);
        }, 100);
      });
    };
  }

}
