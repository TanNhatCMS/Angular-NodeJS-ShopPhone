import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Users} from "../models/users";
import {AuthService} from "./auth.service";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL: string = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthService
  ) {
  }
  protected userList: Users[] = []


  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.baseURL}/users`);
  }

  getUserId(id: string) {
    return this.http.get<Users>(`${this.baseURL}/user/${id}`);
  }

  addUser(newUser: any): Observable<Users[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Users[]>(`${this.baseURL}/user`, newUser, { headers });
  }

  updateUser(id: string, frmUser: any): Observable<Users[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<Users[]>(`${this.baseURL}/user/${id}`, frmUser, { headers });
  }

  deleteUser(id: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseURL}/user/${id}`, { headers });
  }

}
