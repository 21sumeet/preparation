import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode = false;
  contactId = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[+]?[\d\s\-()]{7,20}$/)]],
      address: ['']
    });
  }

  ngOnInit(): void {
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
        this.loading = false;
        this.cdr.detectChanges(); 
        this.contactForm.patchValue({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email || '',
          phone: response.data.phone,
          address: response.data.address || ''
        });
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load contact', 'Close', { duration: 3000 });
        this.router.navigate(['/contacts']);
         this.cdr.detectChanges(); 
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.loading = true;
    const formData = this.contactForm.value;

    if (this.isEditMode) {
      this.contactService.updateContact(this.contactId, formData).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open('Contact updated! ✅', 'Close', { duration: 3000 });
          this.router.navigate(['/contacts']);
        },
        error: (error) => {
          this.loading = false;
          const message = error.error?.message || 'Failed to update contact';
          this.snackBar.open(message, 'Close', { duration: 3000 });
        }
      });
    } else {
      this.contactService.createContact(formData).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open('Contact created! ✅', 'Close', { duration: 3000 });
          this.router.navigate(['/contacts']);
        },
        error: (error) => {
          this.loading = false;
          const message = error.error?.message || 'Failed to create contact';
          this.snackBar.open(message, 'Close', { duration: 3000 });
        }
      });
    }
  }
}