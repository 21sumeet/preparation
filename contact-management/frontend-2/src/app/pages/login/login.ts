import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  //standalone=true,
  imports: [CommonModule , RouterLink ,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email ="";
  password="";
  loading = false;
  errorMessage="";
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
  this.errorMessage = '';

  if (!this.email || !this.password) {
    this.errorMessage = 'Email and password are required';
    return;
  }

  if (!this.isValidEmail(this.email)) {
    this.errorMessage = 'Please enter a valid email';
    return;
  }

  // Password validations
  if (this.password.length < 8) {
    this.errorMessage = 'Password must be at least 8 characters';
    return;
  }

  if (!/[A-Z]/.test(this.password)) {
    this.errorMessage = 'Password must contain at least one uppercase letter';
    return;
  }

  if (!/[a-z]/.test(this.password)) {
    this.errorMessage = 'Password must contain at least one lowercase letter';
    return;
  }

  if (!/[0-9]/.test(this.password)) {
    this.errorMessage = 'Password must contain at least one number';
    return;
  }

  if (!/[!@#$%^&*()_+\-=\[\]{}|;:',.<>?/`~]/.test(this.password)) {
    this.errorMessage = 'Password must contain at least one special character (!@#$%...)';
    return;
  }

  // Call API
  this.loading = true;
  this.authService.login(this.email, this.password).subscribe({
    next: (response) => {
      this.loading = false;
      this.router.navigate(['/contacts']);
    },
    error: (error) => {
      this.loading = false;
      this.errorMessage = error.error?.message || 'Login failed. Try again.';
    }
  });
}
private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
//   onSubmit():void{
//     this.errorMessage =""  //reset error msg 
//     //basic validation
//     if(!this.email || !this.password){
//       this.errorMessage = 'Email and password are required';
//       return;
//     }
//     if(!this.isValidEmail(this.email)){
//       this.errorMessage = "Invalid email structure";
//       return
//     }
//     // Password validations
//   if (this.password.length < 8) {
//     this.errorMessage = 'Password must be at least 8 characters';
//     return;
//   }

//   if (!/[A-Z]/.test(this.password)) {
//     this.errorMessage = 'Password must contain at least one uppercase letter';
//     return;
//   }

//   if (!/[a-z]/.test(this.password)) {
//     this.errorMessage = 'Password must contain at least one lowercase letter';
//     return;
//   }

//   if (!/[0-9]/.test(this.password)) {
//     this.errorMessage = 'Password must contain at least one number';
//     return;
//   }

//   if (!/[!@#$%^&*()_+\-=\[\]{}|;:',.<>?/`~]/.test(this.password)) {
//     this.errorMessage = 'Password must contain at least one special character (!@#$%...)';
//     return;
//   }
//   this.loading= true;
//   this.authService.login(this.email, this.password).subscribe({
//       next: (response) => {
//         this.loading = false;
//         this.router.navigate(['/contacts']);
//       },
//       error: (error) => {
//         this.loading = false;
//         this.errorMessage = error.error?.message || 'Login failed. Try again.';
//       }
//     });
//   }
// }

//   private isValidEmail(email: string): boolean {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   }


}
