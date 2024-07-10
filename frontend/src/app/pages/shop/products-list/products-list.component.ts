import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {NgIf} from '@angular/common';
import {ProductsService} from "../../../services/products.service";
import {Product} from "../../../models/products";
import {RatingComponent} from "../../../common/rating/rating.component";
import {DialogService} from "../../../services/dialog.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialog} from "../../../common/delete-dialog/delete-dialog.component";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, RatingComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements AfterViewInit, OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
              private dialogService: DialogService,
              public dialog: MatDialog,
    private ProductsService: ProductsService,
    private userService: UserService,
  )
  {

  }

  displayedColumns: string[] = ['product', 'category', 'price', 'ratings', 'stockQuantity', 'action'];

  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>(this.products);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  // Khi nào sử dụng ngAfterViewInit
  // ngAfterViewInit thường được sử dụng khi bạn cần truy cập hoặc thao tác với các thành phần con sau khi chúng đã được khởi tạo. Ví dụ, nếu bạn cần lấy một tham chiếu đến một phần tử DOM hoặc thực hiện các thao tác mà yêu cầu toàn bộ view phải được hiển thị trước, bạn sẽ sử dụng ngAfterViewInit.
  //
  // Vòng đời của component
  // Để hiểu rõ hơn về vị trí của ngAfterViewInit trong vòng đời của một component, dưới đây là danh sách các lifecycle hooks trong thứ tự gọi của chúng:
  //
  // ngOnChanges(): Được gọi trước khi Angular thực hiện bất kỳ cập nhật nào lên các thuộc tính ràng buộc dữ liệu.
  // ngOnInit(): Được gọi một lần duy nhất khi component được khởi tạo.
  // ngDoCheck(): Được gọi trong mỗi chu kỳ thay đổi, cho phép bạn thực hiện các kiểm tra tùy chỉnh.
  // ngAfterViewInit(): Được gọi sau khi Angular đã khởi tạo và hiển thị view của component và các thành phần con.
  // ngAfterViewChecked(): Được gọi sau mỗi lần kiểm tra view, sau ngAfterViewInit.
  // ngOnDestroy(): Được gọi ngay trước khi Angular phá hủy component.
  ngAfterViewInit() {
    if (this.paginator instanceof MatPaginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((res: any) => {
      this.products = res;
      this.dataSource = new MatTableDataSource<Product>(this.products);
    });
  }
  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: {
        title: "Xác nhận xoá!",
        message: "Thao tác xoá sản phẩm",
        id: id,
        cb:
          (data: any) => {
            this.DeleteUser(data.id);
          }
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  DeleteUser(id: string): void {
    this.ProductsService.DeleteProduct(id).subscribe((res: any) => {
      console.log(res);
      if(res.message==='Product deleted'){
        this.dialogService.openDialog({
          title: 'THÀNH CÔNG',
          message: 'Xoá thành công sản phẩm: id: '+id
        });
        this.productsService.getAllProducts().subscribe((res: any) => {
          this.products = res;
          this.dataSource = new MatTableDataSource<Product>(this.products);
        });
      }else{
        this.dialogService.openDialog({
          title: 'THẤT BẠI',
          message: 'Xoá sản phẩm thất bại: id: '+id
        });
      }

    });
  }
}

