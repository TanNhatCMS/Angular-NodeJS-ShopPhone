import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {slideInAnimation} from "../animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'Shop Phone';
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/logout' && this.isAuthenticated()) {
        this.logout();
      }
    });
  }
  prepareRoute(outlet: RouterOutlet): void {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    );
  }
  isAuthenticated() {
    return this.authService.isAuthenticated
  }
  logout() {
    this.authService.logout()
  }
}
