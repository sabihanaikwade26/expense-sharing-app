import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../../services/trip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  // ✅ declare only (NO initialization here)
  trips$: Observable<any[]> = of([]);

  showSheet = false;
  isEditMode = false;
  selectedTripId: number | null = null;
  showDropdown = false;

  tripName = '';
  totalBudget = '';
  tripDate = '';
  availableUsers: any[] = [];
  selectedMembers: (number | null)[] = [];

  constructor(
    private tripService: TripService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
  ) {}

  // ngOnInit(): void {
  //   // ✅ SAFE initialization here
  //   this.trips$ = this.tripService.getTrips().pipe(
  //     map((res: any) => {
  //       let data: any[] = [];

  //       if (Array.isArray(res)) {
  //         data = res;
  //       } else if (res?.data && Array.isArray(res.data)) {
  //         data = res.data;
  //       }

  //       return data.map((trip: any) => {
  //         let members = trip.members;

  //         if (typeof members === 'string') {
  //           try {
  //             members = JSON.parse(members);
  //           } catch {
  //             members = [];
  //           }
  //         }

  //         return {
  //           ...trip,
  //           members: Array.isArray(members) ? members : [],
  //         };
  //       });
  //     }),
  //   );
  // }

  ngOnInit(): void {
    this.tripService.getUsers().subscribe({
      next: (users: any[]) => {
        this.availableUsers = users;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.loadTrips();
  }

  loadTrips() {
    this.trips$ = this.tripService.getMyTrips().pipe(
      map((res: any) => {
        let data: any[] = [];

        if (Array.isArray(res)) {
          data = res;
        } else if (res?.data && Array.isArray(res.data)) {
          data = res.data;
        }

        return data.map((trip: any) => {
          let members = trip.members;

          if (typeof members === 'string') {
            try {
              members = JSON.parse(members);
            } catch {
              members = [];
            }
          }

          return {
            ...trip,
            members: Array.isArray(members) ? members : [],
          };
        });
      }),
    );
  }

  openTrip(id: number) {
    this.router.navigate(['/trip', id]);
  }

  showToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2500,
    });
  }

  resetFormState() {
    this.tripName = '';
    this.totalBudget = '';
    this.tripDate = '';
    this.selectedMembers = [];
    this.selectedTripId = null;
    this.isEditMode = false;
  }

  openSheet() {
    this.showSheet = true;
  }

  closeSheet() {
    this.showSheet = false;
  }

  addMember() {
    this.selectedMembers.push(null);
  }

  removeMember(index: number) {
    this.selectedMembers.splice(index, 1);
  }

  trackByIndex(index: number) {
    return index;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  submitTrip() {
    const payload = {
      name: this.tripName,
      total_amount: Number(this.totalBudget),
      trip_date: this.tripDate,
      members: this.selectedMembers.filter((id) => id != null),
    };

    console.log('Selected Members:', this.selectedMembers);
    console.log('Payload:', payload);

    const request$ = this.isEditMode
      ? this.tripService.updateTrip(this.selectedTripId!, payload)
      : this.tripService.createTrip(payload);

    request$.subscribe({
      next: (response) => {
        console.log('SUCCESS', response);

        const message = this.isEditMode
          ? 'Trip updated successfully ✅'
          : 'Trip created successfully 🎉';

        this.closeSheet();
        this.resetFormState();

        setTimeout(() => {
          this.loadTrips();
          this.showToast(message);
        });
      },
      error: (err) => {
        console.error('API ERROR:', err);
        console.error('ERROR BODY:', err.error);
        this.showToast('Something went wrong ❌');
      },
    });
  }

  editTrip(trip: any) {
    this.resetFormState();

    this.isEditMode = true;
    this.selectedTripId = trip.id;

    this.tripName = trip.name;
    this.totalBudget = trip.total_amount;
    this.tripDate = trip.trip_date;

    this.selectedMembers = (trip.members || []).map((m: any) =>
      typeof m === 'object' ? m.id : Number(m),
    );

    if (this.selectedMembers.length === 0) {
      this.selectedMembers = [null];
    }

    this.showSheet = true;
  }

  deleteTrip(id: number) {
    if (!confirm('Are you sure?')) return;

    this.tripService.deleteTrip(id).subscribe({
      next: () => {
        this.loadTrips(); // Refresh list
        this.showToast('Trip deleted 🗑️');
      },
      error: () => {
        this.showToast('Delete failed ❌');
      },
    });
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
      error: () => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
    });
  }
}
