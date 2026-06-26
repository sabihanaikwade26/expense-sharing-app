import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userStr = localStorage.getItem('user');

  if (!userStr) {
    router.navigate(['/']);
    return false;
  }

  const user = JSON.parse(userStr);
  const expectedRole = route.data?.['role'];

  if (user.role !== expectedRole) {
    router.navigate(['/']);
    return false;
  }

  return true;
};