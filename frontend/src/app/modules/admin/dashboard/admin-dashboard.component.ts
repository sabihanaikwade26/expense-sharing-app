import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AdminDashboardService } from '../../../services/admin/admin-dashboard.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss'],
})
export class AdminDashboardComponent implements OnInit {
  stats: any;
  users: any[] = [];
  trips: any[] = [];

  constructor(
    private adminService: AdminDashboardService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('ADMIN DASHBOARD INIT');
    this.loadStats();
    this.loadUsers();
    this.loadTrips();
  }

  loadStats() {
    this.adminService.getStats().subscribe({
      next: (res: any) => {
        console.log('STATS RESPONSE:', res);
        this.stats = res;
      },
      error: (err) => {
        console.log('STATS ERROR:', err);
      },
    });
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: any) => {
        console.log('USERS RESPONSE:', res);

        this.users = res.data ?? res;

        this.cdr.detectChanges();

        console.log('USERS ASSIGNED:', this.users);
      },
      error: (err) => {
        console.log('USERS ERROR:', err);
      },
    });
  }

  loadTrips() {
    this.adminService.getTrips().subscribe({
      next: (res: any) => {
        console.log('TRIPS RESPONSE:', res);

        this.trips = res;

        this.cdr.detectChanges();

        console.log('TRIPS ASSIGNED:', this.trips);
      },
      error: (err) => {
        console.log('TRIPS ERROR:', err);
      },
    });
  }

  goToTrips() {
    this.router.navigate(['/admin/trips']);
  }

  goToExpenses() {
    this.router.navigate(['/expenses']);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
      error: () => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
    });
  }
}