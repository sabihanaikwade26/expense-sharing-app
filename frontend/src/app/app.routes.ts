import { Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/login/login';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';

import { DashboardComponent } from './modules/trips/dashboard/dashboard';
import { TripDetailsComponent } from './modules/trips/trip-details/trip-details';

import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role-guard';
import { MemberComponent } from './modules/member/member-trips/member.component';
import { ExpenseListComponent } from './modules/expenses/expense-list/expense-list.component';
import { AddExpenseComponent } from './modules/expenses/add-expense/add-expense.component';
import { EditExpenseComponent } from './modules/expenses/edit-expense/edit-expense.component';

export const routes: Routes = [
  // AUTH
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // COMMON PROTECTED DASHBOARD ROUTE
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [authGuard],
  // },

  {
    path: 'trip/:id',
    component: TripDetailsComponent,
    canActivate: [authGuard],
  },

  // ROLE BASED ROUTES (only guard differs)
  // {
  //   path: 'admin/dashboard',
  //   component: DashboardComponent,
  //   canActivate: [authGuard, roleGuard],
  //   data: { role: 'admin' },
  // },

  {
    path: 'user/dashboard',
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'user' },
  },

  // {
  //   path: 'member/dashboard',
  //   component: DashboardComponent,
  //   canActivate: [authGuard, roleGuard],
  //   data: { role: 'member' },
  // },

  {
    path: 'admin/dashboard',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadComponent: () =>
      import('./modules/admin/dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },

  {
    path: 'admin/trips',
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
  },

  {
    path: 'member',
    children: [
      {
        path: 'dashboard',
        component: MemberComponent,
      },
    ],
  },

  {
    path: 'expenses',
    component: ExpenseListComponent,
    canActivate: [authGuard],
  },

  {
    path: 'expenses/add',
    component: AddExpenseComponent,
    canActivate: [authGuard],
  },

  {
    path: 'expenses/edit/:id',
    component: EditExpenseComponent,
    canActivate: [authGuard],
  },
];
