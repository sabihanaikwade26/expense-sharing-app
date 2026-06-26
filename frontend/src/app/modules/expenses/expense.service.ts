import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from './expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:8000/api/expenses';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  createExpense(data: Expense): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateExpense(id: number, data: Expense): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}