import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../../services/expense.service';
import { TripService } from '../../../services/trip.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './trip-details.html',
  styleUrls: ['./trip-details.scss'],
})
export class TripDetailsComponent implements OnInit {
  tripId!: number;
  trip: any = null;

  members: any[] = [];
  splitMembers: number[] = [];
  expenses: any[] = [];

  // MODAL STATE
  showExpenseSheet = false;

  // FORM DATA
  expenseTitle = '';
  expenseAmount = '';
  paidBy = '';

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private tripService: TripService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.tripId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadExpenses();

    // this.members = ['A', 'B', 'C']; // TEMP (later API)
    this.loadTrip();
  }

  loadExpenses() {
    this.expenseService.getExpenses(this.tripId).subscribe({
      next: (res: any) => {
        this.expenses = res;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  // OPEN MODAL
  openExpenseSheet() {
    this.showExpenseSheet = true;

    this.expenseTitle = '';
    this.expenseAmount = '';
    this.paidBy = '';

    this.splitMembers = this.members.map((m) => m.id);
  }

  // CLOSE MODAL
  closeExpenseSheet() {
    this.showExpenseSheet = false;
  }

  // TOGGLE SPLIT
  toggleSplitMember(memberId: number) {
    if (this.splitMembers.includes(memberId)) {
      this.splitMembers = this.splitMembers.filter((id) => id !== memberId);
    } else {
      this.splitMembers.push(memberId);
    }
  }

  // ADD EXPENSE (TEMP UI)
  addExpense() {
    const payload = {
      trip_id: this.tripId,
      title: this.expenseTitle,
      amount: this.expenseAmount,
      paid_by: this.paidBy,
      split_between: this.splitMembers,
    };

    this.expenseService.createExpense(payload).subscribe({
      next: () => {
        this.loadExpenses();
        this.closeExpenseSheet();
      },
      error: (err) => console.error(err),
    });
  }

  loadTrip() {
    this.tripService.getTrip(this.tripId).subscribe({
      next: (res: any) => {
        this.trip = res;

        // IMPORTANT FIX
        this.members = Array.isArray(res.members) ? res.members : [];

        console.log('Members:', this.members);
      },
      error: (err) => console.error(err),
    });
  }

  get totalExpenses(): number {
    return this.expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
  }

  get remainingBudget(): number {
    return Number(this.trip?.total_amount || 0) - this.totalExpenses;
  }

  get paymentSummary() {
    const summary: any = {};

    this.expenses.forEach((exp) => {
      const payer = exp.paid_by;

      summary[payer] = (summary[payer] || 0) + Number(exp.amount);
    });

    return Object.entries(summary).map(([name, amount]) => ({
      name,
      amount,
    }));
  }
}
