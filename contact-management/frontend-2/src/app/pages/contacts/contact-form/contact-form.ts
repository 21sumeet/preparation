import { Component, NgZone, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  imports: [],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm implements OnInit {
   // Form fields
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  address = '';

  // Page state
  isEditMode = false;
  contactId = '';
  loading = false;
  saving = false;
  errorMessage = '';
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // Check if URL has :id → edit mode
    this.contactId = this.route.snapshot.params['id'];
    if (this.contactId) {
      this.isEditMode = true;
      this.loadContact();
    }
  }
  loadContact(): void {
    this.loading = true;
    this.contactService.getContact(this.contactId).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
          this.email = response.data.email || '';
          this.phone = response.data.phone;
          this.address = response.data.address || '';
          this.loading = false;
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.loading = false;
          this.errorMessage = 'Failed to load contact';
        });
      }
    });
  }

  // Form submit — create or update
  onSubmit(): void {
    this.errorMessage = '';

    // Validate
    if (!this.firstName.trim()) {
      this.errorMessage = 'First name is required';
      return;
    }

    if (this.firstName.trim().length < 2) {
      this.errorMessage = 'First name must be at least 2 characters';
      return;
    }

    if (!this.lastName.trim()) {
      this.errorMessage = 'Last name is required';
      return;
    }

    if (this.lastName.trim().length < 2) {
      this.errorMessage = 'Last name must be at least 2 characters';
      return;
    }

    if (this.email && !this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email';
      return;
    }

    if (!this.phone.trim()) {
      this.errorMessage = 'Phone number is required';
      return;
    }

    if (!this.isValidPhone(this.phone)) {
      this.errorMessage = 'Please enter a valid phone number';
      return;
    }

    // Prepare data
    const contactData = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim() || null,
      phone: this.phone.trim(),
      address: this.address.trim() || null
    };

    this.saving = true;

    if (this.isEditMode) {
      // Update existing contact
      this.contactService.updateContact(this.contactId, contactData).subscribe({
        next: () => {
          this.ngZone.run(() => {
            this.saving = false;
            this.router.navigate(['/contacts']);
          });
        },
        error: (error) => {
          this.ngZone.run(() => {
            this.saving = false;
            this.errorMessage = error.error?.message || 'Failed to update contact';
          });
        }
      });
    } else {
      // Create new contact
      this.contactService.createContact(contactData).subscribe({
        next: () => {
          this.ngZone.run(() => {
            this.saving = false;
            this.router.navigate(['/contacts']);
          });
        },
        error: (error) => {
          this.ngZone.run(() => {
            this.saving = false;
            this.errorMessage = error.error?.message || 'Failed to create contact';
          });
        }
      });
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isValidPhone(phone: string): boolean {
    return /^[+]?[\d\s\-()]{7,20}$/.test(phone);
  }
}


