import {NgIf} from '@angular/common';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {Users} from "../../../models/users";
import {UserService} from "../../../services/user.service";
import {Product} from "../../../models/products";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../services/auth.service";
import {DialogService} from "../../../services/dialog.service";
import {DeleteDialog} from "../../../common/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatPaginatorModule, MatTableModule, NgIf],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements AfterViewInit, OnInit {

  Users: Users[] = [];
  // Basic Dialog
  animal: string | undefined;
  name: string | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialogService: DialogService,
    public dialog: MatDialog
  ) {

  }

  displayedColumns: string[] = ['name', 'email', 'role', 'verify', 'action'];
  dataSource = new MatTableDataSource<Users>(this.Users);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    if (this.paginator instanceof MatPaginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  isloggedIn = false;
  isAdmin = false;
  token: string = '';

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe((res: any) => {
      this.Users = res;
      this.dataSource = new MatTableDataSource<Users>(this.Users);
    });

  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: {
        title: "Xác nhận xoá!",
        message: "Thao tác xoá người dùng",
        id: id,
        cb:
          (data: any) => {
            this.DeleteUser(data.id);
          }
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  DeleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe((res: any) => {
      console.log(res);
      if(res.message==='user deleted'){
        this.dialogService.openDialog({
          title: 'THÀNH CÔNG',
          message: 'Xoá người dùng thành công: id: '+id
        });
      }else{
        this.dialogService.openDialog({
          title: 'THẤT BẠI',
          message: 'Xoá người dùng thất bại: id: '+id
        });
      }
      this.userService.getAllUsers().subscribe((res: any) => {
        this.Users = res;
        this.dataSource = new MatTableDataSource<Users>(this.Users);
      });
    });
  }
}
