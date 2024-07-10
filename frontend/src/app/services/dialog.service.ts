import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../common/dialog/dialog.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private opened = false;

  constructor(private dialog: MatDialog, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const dialogData = this.router.getCurrentNavigation()?.extras.state?.['dialogData'];
      if (dialogData) {
        this.openDialog(dialogData);
      }
    });
  }
  openDialog(data: any): void {
    if (!this.opened) {
      this.opened = true;
      const dialogRef = this.dialog.open(DialogComponent, {
        data: data,
        maxHeight: '100%',
        width: '540px',
        maxWidth: '100%',
        disableClose: true,
        hasBackdrop: true,
      });
      dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
      });
    }
  }
}
