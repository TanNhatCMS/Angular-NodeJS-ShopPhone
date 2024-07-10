import {Component} from '@angular/core';
import {FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RouterLink, Router} from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgIf} from '@angular/common';
import {IconsModule} from "../../common/icons/icons.module";
import {AuthService} from "../../services/auth.service";
import {SignUpForm} from "../../models/auth";
import { passwordMatchValidator } from '../../validators/password-match.validator';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, MatButton, MatIconButton, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule, NgIf, IconsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  form: SignUpForm = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.authForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    }, { validator: passwordMatchValidator() });
  }

  // Password Hide
  hide = true;
  hide2 = true;
  // Form
  authForm: FormGroup;

  onSubmit() {
    if (this.authForm.valid) {
      this.form = {
        name: this.authForm.value.name,
        email: this.authForm.value.email,
        password: this.authForm.value.password,
      }
      this.authService.signUp(this.form)
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

}
