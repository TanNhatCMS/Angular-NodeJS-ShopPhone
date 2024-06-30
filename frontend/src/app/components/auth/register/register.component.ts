import { Component } from '@angular/core';
import {RegisterForm} from "../../../models/auth";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: RegisterForm = {
    fullName: '',
    email: '',
    password: '',
    comfirm_password: ''
  }
  constructor(private authService: AuthService) { }
  submit() {
    this.authService.register(this.form)
  }
}
