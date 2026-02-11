import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name = '';
  email = '';
  role = '';
  joinedDate = '';
  profilePicUrl = '';
  
  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.name = user.name;
      this.email = user.email;
      this.role = user.role;
      this.profilePicUrl = this.authService.getProfilePicUrl();
    }
  }

  // Update name
  updateName(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.name.trim()) {
      this.errorMessage = 'Name is required';
      return;
    }

    if (this.name.trim().length < 2) {
      this.errorMessage = 'Name must be at least 2 characters';
      return;
    }

    this.saving = true;
    this.authService.updateProfile(this.name.trim()).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          this.saving = false;
          this.successMessage = 'Name updated successfully!';
          this.clearMessageAfter();
        });
      },
      error: (error) => {
        this.ngZone.run(() => {
          this.saving = false;
          this.errorMessage = error.error?.message || 'Failed to update name';
          this.clearMessageAfter();
        });
      }
    });
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Only JPG, PNG, WEBP images are allowed';
      this.clearMessageAfter();
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage = 'Image must be less than 5MB';
      this.clearMessageAfter();
      return;
    }

    // Upload
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.uploadProfilePic(file).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          this.loading = false;
          this.profilePicUrl = this.authService.getProfilePicUrl();
          this.successMessage = 'Profile picture updated!';
          this.clearMessageAfter();
        });
      },
      error: (error) => {
        this.ngZone.run(() => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Failed to upload picture';
          this.clearMessageAfter();
        });
      }
    });
  }

  // Remove profile pic
  removeProfilePic(): void {
    if (!confirm('Remove your profile picture?')) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.removeProfilePic().subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.loading = false;
          this.profilePicUrl = '';
          this.successMessage = 'Profile picture removed!';
          this.clearMessageAfter();
        });
      },
      error: (error) => {
        this.ngZone.run(() => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Failed to remove picture';
          this.clearMessageAfter();
        });
      }
    });
  }

  private clearMessageAfter(): void {
    setTimeout(() => {
      this.ngZone.run(() => {
        this.successMessage = '';
        this.errorMessage = '';
      });
    }, 3000);
  }
}