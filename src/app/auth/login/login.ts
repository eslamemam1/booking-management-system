import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private http = inject(HttpClient);
  loginForm = new FormGroup({
    EmailId: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', Validators.required),
  });
  error = '';
  sendData() {
    if (this.loginForm.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }
    console.log(this.loginForm.value);
    this.http.post('api/User/Login', this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Handle successful login, e.g., redirect to dashboard
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.error = 'Login failed. Please check your credentials.';
      },
    });
  }
}
