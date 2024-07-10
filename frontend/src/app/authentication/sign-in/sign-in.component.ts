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
import {SignInForm, SignUpForm} from "../../models/auth";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [
    IconsModule,
    RouterLink,
    MatButton,
    MatIconButton,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  form: SignInForm = {
    email: '',
    password: ''
  };
  email = '';
  // Password Hide
  hide = true;

  // Form
  authForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (state !== undefined && state['email'] !== undefined) {
      this.email = state['email'];
    }
    this.authForm = this.fb.group({
      email: [ this.email , [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      keepLoggedIn: [false]
    });

  }

  onSubmit() {
    if (this.authForm.valid) {
      this.form = {
        email: this.authForm.value.email,
        password: this.authForm.value.password,
      }
        this.authService.signIn(this.form, this.authForm.value.keepLoggedIn)
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
