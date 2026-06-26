import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onRegister() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.confirmPassword,
    };

    this.authService.register(payload).subscribe({
      next: (response) => {
        alert('Registration Successful');

        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('FULL ERROR:', error);

        if (error.error?.message) {
          alert(error.error.message);
        } else if (error.error?.errors) {
          alert(JSON.stringify(error.error.errors));
        } else {
          alert('Registration Failed - Check console');
        }
      },
    });
  }
}
