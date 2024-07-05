import {Component, HostListener, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() dark: boolean=false;
  isdark: boolean = true;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if(this.dark) {
      const threshold = 100;
      this.isdark = window.scrollY > threshold;
    }else {
      this.isdark = true;
    }
  }
  constructor(private authService: AuthService) {
    this.isdark = !this.dark;
  }
  isAuthenticated() {
    return this.authService.isAuthenticated
  }
  logout() {
    this.authService.logout()
  }
}
