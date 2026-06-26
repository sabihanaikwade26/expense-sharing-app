import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member-trips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-trips.html',
  styleUrls: ['./member-trips.scss'],
})
export class MemberComponent implements OnInit {
  user = {
    name: 'Member',
  };

  stats = {
    totalTrips: 0,
    activeTrips: 0,
    completedTrips: 0,
    expenses: 0,
  };

  trips: any[] = [];

  private apiUrl = 'http://127.0.0.1:8000/api'; // adjust if needed

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMemberData();
  }

  loadMemberData(): void {
    const token = localStorage.getItem('token');

    this.http.get<any>(`${this.apiUrl}/member/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (res) => {
        this.user.name = res?.user?.name || 'Member';
        this.stats = res?.stats || this.stats;
        this.trips = res?.trips || [];
      },
      error: (err) => {
        console.error('Failed to load member data', err);
      }
    });
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/';
  }
}