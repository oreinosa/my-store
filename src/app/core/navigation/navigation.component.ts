import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  screenSize = 4;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {

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
  }

}
