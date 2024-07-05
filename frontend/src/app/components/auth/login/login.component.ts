import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {LoginForm} from "../../../models/auth";
import { Router } from '@angular/router';
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
  constructor(private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (state !== undefined && state['email'] !== undefined) {
      this.form.email = state['email'];
    }
  }

  submit(event: Event): void {
    event.preventDefault();

  }
  login(){
    if(this.form.email === '' || this.form.password === '') {
      this.authService.login(this.form)
    }
  }
  register(){
    this.router.navigate(['/register'], { state: { animation: 'Right-Left' } })
  }
}
