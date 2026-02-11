import { CommonModule } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContactService, Contact } from '../../../services/contact.service';


@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];
  searchQuery = '';
  sortBy = '';
  sortOrder = 'asc';
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private contactService: ContactService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit():void{
    this.loadContacts();
  }

  loadContacts():void{
    this.loading = true;
    this.contactService.getContacts(this.searchQuery , this.sortBy ,this.sortOrder).subscribe({
      next:(response)=>{
        this.ngZone.run(() => {
          this.contacts = response.data;
          this.loading = false;
        });
      },
      error: (error) => {
        this.ngZone.run(() => {
          this.loading = false;
          this.errorMessage = 'Failed to load contacts';
          this.clearMessageAfter();
        });
      }
    })
  }

  onSearch(): void {
    this.loadContacts();
  }
  clearSearch(): void {
    this.searchQuery = '';
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

  getSortIcon(column: string): string {
    if (this.sortBy !== column) return '↕️';
    return this.sortOrder === 'asc' ? '⬆️' : '⬇️';
  }
  editContact(id: string): void {
    this.router.navigate(['/contacts/edit', id]);
  }

  deleteContact(id: string, name: string): void {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    this.contactService.deleteContact(id).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.successMessage = `"${name}" deleted successfully!`;
          this.loadContacts();
          this.clearMessageAfter();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.errorMessage = 'Failed to delete contact';
          this.clearMessageAfter();
        });
      }
    });
  }
 
  private clearMessageAfter(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }

}
