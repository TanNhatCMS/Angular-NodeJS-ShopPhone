import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {LoginForm} from "../auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: LoginForm = {
    email: '',
    password: ''
  }
  constructor(private authService: AuthService) { }
  submit() {
    this.authService.login(this.form)
    console.log(this.form)
  }
}
