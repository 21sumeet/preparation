import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule , RouterLink ,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  name = "";
  email = "";
  password = "";
  showPassword = false;
  confirmPassword="";
  showConfirmPassword = false;
  errorMessage = "";
  loading = false;

  constructor(private authService: AuthService, private router: Router){}

  onSubmit():void{
    this.loading = true;
    this.errorMessage="";
    //name validator
    if (!this.name.trim()) {
      this.errorMessage = 'Name is required';
      return;
    }
    if (this.name.trim().length < 2) {
      this.errorMessage = 'Name must be at least 2 characters';
      return;
    }
    //email validator
    if (!this.email) {
      this.errorMessage = 'Email is required';
      return;
    }
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email';
      return;
    }
    // Password validation
    if (!this.password) {
      this.errorMessage = 'Password is required';
      return;
    }
    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters';
      return;
    }
    if (!/[A-Z]/.test(this.password)) {
      this.errorMessage = 'Password must contain at least one uppercase letter (A-Z)';
      return;
    }
    if (!/[a-z]/.test(this.password)) {
      this.errorMessage = 'Password must contain at least one lowercase letter (a-z)';
      return;
    }
    if (!/[0-9]/.test(this.password)) {
      this.errorMessage = 'Password must contain at least one number (0-9)';
      return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{}|;:',.<>?/`~]/.test(this.password)) {
      this.errorMessage = 'Password must contain at least one special character (!@#$%...)';
      return;
    }
    // Confirm password
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    //API call
    this.loading = true;
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {  // using next: bcoz we are sending more than one data 
        this.loading = false;
        this.router.navigate(['/contacts']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Try again.';
      }
    })
  }
  getPasswordStrength(): string {
    if (!this.password) return '';
    
    let strength = 0;
    if (this.password.length >= 8) strength++;
    if (/[A-Z]/.test(this.password)) strength++;
    if (/[a-z]/.test(this.password)) strength++;
    if (/[0-9]/.test(this.password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{}|;:',.<>?/`~]/.test(this.password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
  }
  // Helper methods for password rules display
  hasUppercase(): boolean {
    return /[A-Z]/.test(this.password);
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.password);
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.password);
  }

  hasSpecial(): boolean {
    return /[!@#$%^&*()_+\-=\[\]{}|;:',.<>?/`~]/.test(this.password);
  }
  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

}
