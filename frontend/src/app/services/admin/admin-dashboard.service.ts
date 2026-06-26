import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  getStats() {
    return this.http.get(`${this.baseUrl}/admin/stats`, this.getAuthHeaders());
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/admin/users`, this.getAuthHeaders());
  }

  getTrips() {
    return this.http.get(`${this.baseUrl}/trips`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
}
