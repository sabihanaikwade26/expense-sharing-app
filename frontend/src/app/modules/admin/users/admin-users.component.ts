import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardService } from '../../../services/admin/admin-dashboard.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  id = Math.random();

  users: any[] = [];

  constructor(private adminService: AdminDashboardService) {}

  ngOnInit(): void {
    console.log('Component ID:', this.id);
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.data ?? res;

        console.log('Immediately:', this.users.length);

        setTimeout(() => {
          console.log('After 1 second:', this.users.length);
        }, 1000);

        setTimeout(() => {
          console.log('After 3 seconds:', this.users.length);
        }, 3000);
      },
      error: (err) => console.error(err),
    });
  }
}
