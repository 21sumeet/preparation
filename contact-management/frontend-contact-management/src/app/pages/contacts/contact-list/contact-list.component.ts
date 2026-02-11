import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { ContactService, Contact } from '../../../core/services/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    
  ],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'actions'];
  searchQuery = '';
  sortBy = '';
  sortOrder = 'asc';
  loading = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.contactService.getContacts(this.searchQuery, this.sortBy, this.sortOrder).subscribe({
      next: (response) => {
        this.contacts = response.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        this.cdr.detectChanges();
        this.snackBar.open('Failed to load contacts', 'Close', { duration: 3000 });
      }
    });
  }

  onSearch(): void {
    this.loadContacts();
  }

  onSort(column: string): void {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.loadContacts();
  }

  editContact(id: string): void {
    this.router.navigate(['/contacts/edit', id]);
    this.cdr.detectChanges();
  }

  deleteContact(id: string, name: string): void {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      this.contactService.deleteContact(id).subscribe({
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

  clearSearch(): void {
    this.searchQuery = '';
    this.loadContacts();
  }
}