import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getExpenses(tripId: number) {
    return this.http.get(`${this.apiUrl}/expenses/${tripId}`);
  }

  createExpense(data: any) {
    return this.http.post(`${this.apiUrl}/expenses`, data);
  }
}