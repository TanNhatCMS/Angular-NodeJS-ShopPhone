import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {ToggleService} from '../header/toggle.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {RouterLink, RouterLinkActive, RouterModule} from '@angular/router';
import {IconsModule} from "../icons/icons.module";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgScrollbarModule,
    MatExpansionModule,
    RouterLinkActive,
    RouterModule,
    RouterLink,
    NgClass,
    IconsModule,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  constructor(
    private toggleService: ToggleService,
    private authService: AuthService
  ) {
    this.toggleService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
  }

  // Toggle Service
  isToggled = false;

  toggle() {
    this.toggleService.toggle();
  }

  isLogin: boolean = false;
  isAdmin: boolean = false;
  // Mat Expansion
  panelOpenState = false;

  ngOnInit(): void {
    this.authService.currentUser.subscribe((res: any) => {
      const [data] = res;
      this.isLogin = !!(data && data.email);
      this.isAdmin = !!(data && data.role === 'admin');
    });
  }
}
