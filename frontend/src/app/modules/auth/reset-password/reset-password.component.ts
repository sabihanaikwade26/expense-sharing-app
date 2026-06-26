import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  email = '';
  token = '';
  password = '';
  confirmPassword = '';

  // NEW: toggles
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    const params = new URLSearchParams(window.location.search);

    this.email = params.get('email') || '';
    this.token = params.get('token') || '';

    console.log('EMAIL:', this.email);
    console.log('TOKEN:', this.token);
  }

  // NEW: password match check
  isPasswordValid(): boolean {
    return (
      this.password.length > 0 &&
      this.password === this.confirmPassword
    );
  }

  onReset() {
    if (!this.isPasswordValid()) {
      alert('Passwords do not match');
      return;
    }

    this.authService
      .resetPassword({
        email: this.email,
        token: this.token,
        password: this.password,
        password_confirmation: this.confirmPassword,
      })
      .subscribe({
        next: () => {
          alert('Password reset successful');

          this.router.navigate(['/']);
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }
}