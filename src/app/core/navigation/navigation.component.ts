import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Link } from 'src/app/shared/models/link.model';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { LogoutComponent } from 'src/app/auth/logout/logout.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  user: User = null;
  screenSize = 4;
  links: Link[] = [];

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

    this.auth.user$.subscribe(user => this.user = user);

    this.auth.getRoutes().subscribe(links => this.links = links);
  }

  openDialog(componentName: string) {
    let component = null;
    switch (componentName) {
      case "login":
        component = LoginComponent;
        break;
      case "register":
        component = RegisterComponent;
        break;
      case "logout":
        component = LogoutComponent;
        break;
    }

    if (component) this.dialog.open(component, { width: "500px" });
  }

}
