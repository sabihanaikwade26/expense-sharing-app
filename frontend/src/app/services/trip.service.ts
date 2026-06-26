import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // GET trips
  getTrips(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trips`);
  }

  // CREATE trip
  createTrip(data: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(`${this.apiUrl}/trips`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // UPDATE trip
  updateTrip(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.put(`${this.apiUrl}/trips/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // DELETE trip
  deleteTrip(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.delete(`${this.apiUrl}/trips/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getTrip(id: number) {
    const token = localStorage.getItem('token');

    return this.http.get(`${this.apiUrl}/trips/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getMyTrips(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(`${this.apiUrl}/my-trips`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
