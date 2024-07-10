import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Xác nhận Đăng xuất</h1>
    <div mat-dialog-content>
      <p>Bạn có chắc chắn muốn đăng xuất?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Hủy</button>
      <button mat-button (click)="onLogoutClick()">Đăng xuất</button>
    </div>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle]
})
export class LogoutConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onLogoutClick(): void {
    this.dialogRef.close(true);
  }
}
