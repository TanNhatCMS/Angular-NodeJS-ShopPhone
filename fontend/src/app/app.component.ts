import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShopPhone';
  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/logout' && this.isAuthenticated()) {
        this.logout();
      }
    });
  }
  isAuthenticated() {
    return this.authService.isAuthenticated
  }
  logout() {
    this.authService.logout()
  }
}
