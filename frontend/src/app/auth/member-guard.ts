import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user.role === 'member') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}