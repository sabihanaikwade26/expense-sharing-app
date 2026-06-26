import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.scss',
})
export class AddExpenseComponent {
  expenseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      paid_by: ['', Validators.required],
      amount: ['', Validators.required],
      expense_date: ['', Validators.required],
      split_type: ['', Validators.required],
      notes: [''],
    });
  }

  saveExpense() {
    console.log(this.expenseForm.value);

    alert('Expense Saved Successfully');
  }
}
