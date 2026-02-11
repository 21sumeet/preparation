import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  profilePic: string | null;  // ← ADD 
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
//new
interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    profilePic: string | null;
    createdAt: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  
  currentUser = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      this.currentUser.set(JSON.parse(user));
      this.isLoggedIn.set(true);
    }
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      name,
      email,
      password
    }).pipe(
      tap(response => {
        if (response.success) {
          this.setSession(response.data);
        }
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        if (response.success) {
          this.setSession(response.data);
        }
      })
    );
  }

// Update profile name
updateProfile(name: string): Observable<ProfileResponse> {
  return this.http.put<ProfileResponse>(`${this.apiUrl}/profile`, { name }).pipe(
    tap(response => {
      if (response.success) {
        const user = this.currentUser();
        if (user) {
          user.name = response.data.name;
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set({ ...user });
        }
      }
    })
  );
}

// Upload profile picture
uploadProfilePic(file: File): Observable<ProfileResponse> {
  const formData = new FormData();
  formData.append('profilePic', file);
  return this.http.put<ProfileResponse>(`${this.apiUrl}/profile-pic`, formData).pipe(
    tap(response => {
      if (response.success) {
        const user = this.currentUser();
        if (user) {
          user.profilePic = response.data.profilePic;
          localStorage.setItem('user', JSON.stringify(user));  // ← updates storage
          this.currentUser.set({ ...user });                   // ← updates signal
        }
      }
    })
  );
}

// Remove profile picture
removeProfilePic(): Observable<ProfileResponse> {
  return this.http.delete<ProfileResponse>(`${this.apiUrl}/profile-pic`).pipe(
    tap(response => {
      if (response.success) {
        const user = this.currentUser();
        if (user) {
          user.profilePic = null;
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set({ ...user });
        }
      }
    })
  );
}

// Get full profile pic URL
getProfilePicUrl(): string {
  const pic = this.currentUser()?.profilePic;
  if (pic) {
    return `http://localhost:5000${pic}`;
  }
  return '';
}

  private setSession(data: { user: User; token: string }): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    this.currentUser.set(data.user);
    this.isLoggedIn.set(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'ADMIN';
  }


  navigateAfterAuth(): void {
  if (this.isAdmin()) {
    this.router.navigate(['/admin']);
  }
  else {
    this.router.navigate(['/contacts']);
  }
}
}