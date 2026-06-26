// TEST GIT CHANGE

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenses = [
      {
        id: 1,
        trip_id: 1,
        title: 'Hotel Booking',
        category: 'Hotel',
        amount: 5000,
        paid_by: 1,
        expense_date: '2026-06-24',
        split_type: 'Equal',
      },

      {
        id: 2,
        trip_id: 1,
        title: 'Lunch',
        category: 'Food',
        amount: 1200,
        paid_by: 2,
        expense_date: '2026-06-24',
        split_type: 'Equal',
      },
    ];
  }

  deleteExpense(id: number): void {
    if (!confirm('Delete this expense?')) {
      return;
    }

    this.expenses = this.expenses.filter((expense) => expense.id !== id);
  }
}
