import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginForm, RegisterForm} from "../models/auth";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {LoaderService} from "./loader.service";
import {DialogService} from "./dialog.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  apiUrl: string = '';
  enableDebug: boolean = false;
  currentUser: any = null;

  constructor(
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private router: Router,
    private http: HttpClient
  ) {
    this.apiUrl = environment.apiUrl;
    this.enableDebug = environment.enableDebug;

    if (this.enableDebug) {
      console.log('Debugging is enabled');
      console.log('API URL:', this.apiUrl);
    }
    const token = localStorage.getItem('token');
    if (token) {
      this.getUserInfo(token);
    }
  }

  ngOnInit() {

  }

  Users: any[] = [
    {
      email: 'itc.edu@gmail.com',
      password: '123456789'
    }
  ];

  login(form: LoginForm) {
    this.isLoading = true;
    this.http.post(this.apiUrl + '/auth/signin', {
      email: form.email, // Assuming email is used as username
      password: form.password
    }).subscribe({
      next: (response: any) => {
        this.isAuthenticated = true;
        localStorage.setItem('token', response.token);
        this.router.navigate(['']);
        this.getUserInfo(response.token);
      },
      error: (err) => {
        console.log(err);
        this.dialogService.openDialog({
          title: 'Đăng nhập thất bại',
          message: 'Đăng nhập thất bại: ' + err.error.message? err.error.message : err.message
        });
        this.isAuthenticated = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  register(form: RegisterForm) {
    if (form.password !== form.comfirm_password) {
      this.dialogService.openDialog({
        title: 'Đăng ký thất bại',
        message: 'Mật khẩu không khớp'
      });
      return;
    }

    // const userExists = this.Users.some(user => user.email === form.email);
    // if (userExists) {
    //   alert('User already exists');
    //   return;
    // }
    this.isLoading = true;
    this.http.post(
      this.apiUrl + '/auth/signup',
      {
        email: form.email,
        password: form.password,
        fullName: form.fullName
      }
    ).subscribe({
      next: (response: any) => {
        //this.isAuthenticated = true;
        this.dialogService.openDialog({
          title: 'ĐĂNG KÝ THÀNH CÔNG',
          message: 'Đăng ký thành công: ' + response.data.user.email
        });
        this.router.navigate(['/login']);
        // this.getUserInfo(response.token); // Fetch user info after login
      },
      error: (err) => {
        this.dialogService.openDialog({
          title: 'ĐĂNG KÝ THẤT BẠI',
          message: 'Đăng ký thất bại: ' + err.message
        });

        // this.isAuthenticated = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
    this.router.navigate(['login']);
    this.isAuthenticated = true;
    console.log(this.Users);
  }

  logout() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.isLoading = true;
      this.http.post(this.apiUrl + '/auth/logout', {}, {headers})
        .subscribe({
          next: (response: any) => {
            this.dialogService.openDialog({
              title: 'ĐĂNG XUẦT',
              message: 'Đăng xuất thành công'
            });
            this.isAuthenticated = false;
            this.router.navigate(['login']);
            localStorage.removeItem('token');
            this.currentUser = null; // Clear user info on logout
          },
          error: (err) => {
            this.dialogService.openDialog({
              title: 'Đăng xuất thất bại',
              message: 'Đăng xuất thất bại: ' + err.message
            });
            this.isAuthenticated = true;
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  getUserInfo(token: string) {
    this.http.get(this.apiUrl + '/auth/current', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (response: any) => {
        this.currentUser = response.data.user;
        this.isAuthenticated = true;
        console.log('User info:', response.data.user);
      },
      error: (err) => {
        console.log('Failed to fetch user info' + err.message);
      }
    });
  }
}
