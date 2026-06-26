import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    const payload = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(payload).subscribe({
      next: (res: any) => {
        // store token + user
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        const role = res.user.role;

        // ROLE BASED REDIRECT
        if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'user') {
          this.router.navigate(['/user/dashboard']);
        } else if (role === 'member') {
          this.router.navigate(['/member/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },

      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
