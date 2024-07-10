import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SignInForm, SignUpForm} from '../models/auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoaderService} from './loader.service';
import {DialogService} from './dialog.service';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  private baseURL: string = environment.apiUrl;
  enableDebug: boolean = false;
  private userSource = new BehaviorSubject([]);
  currentUser = this.userSource.asObservable();
  private token: string = '';
  constructor(
    private loaderService: LoaderService,
    private dialogService: DialogService,
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.enableDebug = environment.enableDebug;

    if (this.enableDebug) {
      console.log('Debugging is enabled');
      console.log('API URL:', this.baseURL);
    }
    this.token = this.cookieService.get('token');
    if (this.token) {
      this.getUserInfo(this.token);
    }
  }
  getToken(){
    this.token = this.cookieService.get('token');
    return this.token;
  }
  signIn(form: SignInForm, keepLoggedIn: boolean) {
    this.isLoading = true;
    this.http.post(this.baseURL + '/auth/signin', {
      email: form.email,
      password: form.password
    }).subscribe({
      next: (response: any) => {
        this.isAuthenticated = true;
        const token = response.data.token;
        const cookieOptions = keepLoggedIn ? {expires: 1} : {};
        this.cookieService.set('token', token, cookieOptions);
        this.router.navigate(['']);
        this.token = token;
        this.getUserInfo(token);
      },
      error: (err) => {
        console.log(err);
        this.dialogService.openDialog({
          title: 'Đăng nhập thất bại',
          message: 'Đăng nhập thất bại: ' + (err.error.message ? err.error.message : err.message)
        });
        this.isAuthenticated = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  signUp(form: SignUpForm) {
    this.isLoading = true;
    this.http.post(this.baseURL + '/auth/signup', {
      email: form.email,
      password: form.password,
      name: form.name
    }).subscribe({
      next: (response: any) => {
        this.dialogService.openDialog({
          title: 'ĐĂNG KÝ THÀNH CÔNG',
          message: 'Đăng ký thành công: ' + response.data.user.email + (response.message ? response.message : "")
        });
        this.router.navigate(['/authentication'], {state: {email: response.data.user.email}});
      },
      error: (err) => {
        this.dialogService.openDialog({
          title: 'ĐĂNG KÝ THẤT BẠI',
          message: 'Đăng ký thất bại: ' + (err.error.message ? err.error.message : err.message)
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  logout() {
    const token = this.cookieService.get('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      this.isLoading = true;
      this.http.post(this.baseURL + '/auth/logout', {}, {headers}).subscribe({
        next: (response: any) => {
          this.dialogService.openDialog({
            title: 'ĐĂNG XUẤT',
            message: 'Đăng xuất thành công ' + (response.message ? response.message : "")
          });
          this.isAuthenticated = false;
          this.router.navigate(['/authentication']);
          this.cookieService.delete('token');
          this.changeUser([]);
        },
        error: (err) => {
          this.dialogService.openDialog({
            title: 'Đăng xuất thất bại',
            message: 'Đăng xuất thất bại: ' + (err.error.message ? err.error.message : err.message)
          });
          this.isAuthenticated = true;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.router.navigate(['/authentication']);
    }
  }

  changeUser(data: any): void {
    this.userSource.next(data);
  }

  getUserInfo(token: string) {
    this.http.get(this.baseURL + '/auth/current', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (response: any) => {
        this.changeUser([response.data.user]||[]);
        this.isAuthenticated = true;
        console.log('User info:', response.data.user);
      },
      error: (err) => {
        console.log('Failed to fetch user info: ' + (err.error.message ? err.error.message : err.message));
      }
    });
  }

  // isLoggedIn() {
  //   let isloggedIn = false;
  //   this.currentUser.subscribe((res: any) => {
  //     const [data] = res;
  //     isloggedIn = !!(data && data.email);
  //   });
  //   return isloggedIn;
  // }
  //
  // isAdmin() {
  //   let isAdmin = false;
  //   this.currentUser.subscribe((res: any) => {
  //     const [data] = res;
  //     isAdmin = !!(data && data.role === 'admin');
  //   });
  //   return isAdmin;
  // }
}
