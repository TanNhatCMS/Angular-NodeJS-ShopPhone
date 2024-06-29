import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginForm, RegisterForm } from "./auth";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  apiUrl: string = '';
  enableDebug: boolean = false;
  currentUser: any = null;

  constructor(private router: Router, private http: HttpClient) {
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
        alert('Login not successful');
        this.isAuthenticated = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  login2(form: LoginForm) {
    this.isLoading = true;
    const user = this.Users.find(user => user.email === form.email && user.password === form.password);
    if (user) {
      this.isAuthenticated = true;
      this.router.navigate(['']);
    } else {
      alert('Login not successful');
      this.isAuthenticated = false;
    }
    this.isLoading = false;
  }

  register(form: RegisterForm) {
    if (form.password !== form.comfirm_password) {
      alert('Passwords do not match');
      return;
    }

    // const userExists = this.Users.some(user => user.email === form.email);
    // if (userExists) {
    //   alert('User already exists');
    //   return;
    // }
    this.isLoading = true;
    this.http.post(this.apiUrl + '/auth/signup', {
      email: form.email, // Assuming email is used as username
      password: form.password,
      fullName: "full name"
    }).subscribe({
      next: (response: any) => {
        //this.isAuthenticated = true;
        // Save token and refreshToken if needed
        alert('Register ' + response.user.email + ' successfully');
        this.router.navigate(['/login']);
        // this.getUserInfo(response.token); // Fetch user info after login
      },
      error: (err) => {
        alert('Register not successful');
        // this.isAuthenticated = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
    this.Users.push({email: form.email, password: form.password});
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
            alert('Logout successfully');
            this.isAuthenticated = false;
            this.router.navigate(['login']);
            localStorage.removeItem('token');
            this.currentUser = null; // Clear user info on logout
          },
          error: (err) => {
            alert('Logout not successful: ' + err.message);
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
        this.currentUser = response.user;
        this.isAuthenticated = true;
        console.log('User info:', response.user);
      },
      error: (err) => {
        console.log('Failed to fetch user info' + err.message);
      }
    });
  }
}
