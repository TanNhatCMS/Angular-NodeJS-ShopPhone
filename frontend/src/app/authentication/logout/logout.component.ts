import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutConfirmationDialogComponent } from './logout-confirmation-dialog.component';
import { Location } from '@angular/common';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.openLogoutConfirmation();
  }

  openLogoutConfirmation(): void {
    const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed logout');
        // Perform the logout action here
        this.authService.logout();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000); // Redirect after 3 seconds
      } else {
        this.location.back();
      }
    });
  }
}
