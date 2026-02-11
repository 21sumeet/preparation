import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminService, User } from '../../core/services/admin.service';
import { Contact } from '../../core/services/contact.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  contacts: Contact[] = [];
  userMap: { [key: string]: string } = {};
  userColumns: string[] = ['name', 'email', 'role', 'createdAt'];
  contactColumns: string[] = ['name', 'email', 'phone', 'owner', 'actions'];
  loading = false;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadContacts();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.data;
        this.users.forEach(user => {
          this.userMap[user.id] = user.name;
        });
        this.loadContacts();
        this.cdr.detectChanges();
      },
      error: () => {
        this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
        this.cdr.detectChanges();
      }
    });
  }
  getOwnerName(userId: string): string {
  return this.userMap[userId] || 'Unknown';
}

  loadContacts(): void {
    this.loading = true;
    this.adminService.getAllContacts().subscribe({
      next: (response) => {
        this.contacts = response.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
    
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load contacts', 'Close', { duration: 3000 });
        this.cdr.detectChanges();
      }
    });
  }

  deleteContact(id: string, name: string): void {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      this.adminService.deleteContact(id).subscribe({
        next: () => {
          this.snackBar.open('Contact deleted! ✅', 'Close', { duration: 3000 });
          this.loadContacts();
        },
        error: () => {
          this.snackBar.open('Failed to delete contact', 'Close', { duration: 3000 });
        }
      });
    }
  }
}