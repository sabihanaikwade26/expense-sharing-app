import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  // Dashboard
  getStats() {
    return this.http.get(`${this.baseUrl}/admin/stats`, this.headers());
  }

  // Users
  getUsers() {
    return this.http.get(`${this.baseUrl}/admin/users`, this.headers());
  }

  deleteUser(id:number){
    return this.http.delete(
      `${this.baseUrl}/admin/users/${id}`,
      this.headers()
    );
  }

  toggleUserStatus(id:number){
    return this.http.put(
      `${this.baseUrl}/admin/users/${id}/status`,
      {},
      this.headers()
    );
  }

  // Trips
  getTrips() {
    return this.http.get(`${this.baseUrl}/trips`, this.headers());
  }

}