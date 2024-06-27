import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginForm, RegisterForm } from "./auth";
import { HttpClient } from "@angular/common/http";
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
    this.http.post(this.apiUrl + '/auth/login', {
      username: form.email, // Assuming email is used as username
      password: form.password,
      expiresInMins: 30
    }).subscribe({
      next: (response: any) => {
        this.isAuthenticated = true;
        // Save token and refreshToken if needed
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
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

    const userExists = this.Users.some(user => user.email === form.email);
    if (userExists) {
      alert('User already exists');
      return;
    }

    this.Users.push({ email: form.email, password: form.password });
    this.router.navigate(['login']);
    this.isAuthenticated = true;
    console.log(this.Users);
  }

  logout() {
    this.router.navigate(['login']);
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.currentUser = null; // Clear user info on logout
  }

  getUserInfo(token: string) {
    this.http.get(this.apiUrl + '/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({
      next: (response: any) => {
        this.currentUser = response;
        this.isAuthenticated = true;
        console.log('User info:', response);
      },
      error: (err) => {
        console.log('Failed to fetch user info');
      }
    });
  }
}
