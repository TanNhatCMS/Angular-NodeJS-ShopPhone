import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginForm, RegisterForm} from "../models/auth";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {LoaderService} from "./loader.service";
import {ErrorDialogService} from "./error-dialog.service";

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
    private errorDialogService: ErrorDialogService,
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
        // Save token and refreshToken if needed
        localStorage.setItem('token', response.token);
        this.router.navigate(['']);
        this.getUserInfo(response.token); // Fetch user info after login
      },
      error: (err) => {
        this.errorDialogService.openDialog('Login not successful ' + err.message);
        this.isAuthenticated = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  register(form: RegisterForm) {
    if (form.password !== form.comfirm_password) {
      this.errorDialogService.openDialog('Passwords do not match');
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
        email: form.email, // Assuming email is used as username
        password: form.password,
        fullName: form.fullName
      }
    ).subscribe({
      next: (response: any) => {
        //this.isAuthenticated = true;
        // Save token and refreshToken if needed
        this.errorDialogService.openDialog('Register ' + response.data.user.email + ' successfully');
        this.router.navigate(['/login']);
        // this.getUserInfo(response.token); // Fetch user info after login
      },
      error: (err) => {
        this.errorDialogService.openDialog('Register not successful');

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
            this.errorDialogService.openDialog('Logout successfully');
            this.isAuthenticated = false;
            this.router.navigate(['login']);
            localStorage.removeItem('token');
            this.currentUser = null; // Clear user info on logout
          },
          error: (err) => {
            this.errorDialogService.openDialog('Logout not successful: ' + err.message);
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
