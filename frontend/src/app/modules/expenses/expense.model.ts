export interface Expense {
  id: number;
  trip_id: number;
  title: string;
  category: string;
  amount: number;
  paid_by: number;
  expense_date: string;
  notes?: string;
  bill_attachment?: string;
  split_type: string;
}