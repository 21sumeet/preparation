import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contact } from './contact.service';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: User[];
  total: number;
}

export interface AllContactsResponse {
  success: boolean;
  message: string;
  data: Contact[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  // Get all users
  getAllUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`);
  }

  // Get all contacts (all users)
  getAllContacts(): Observable<AllContactsResponse> {
    return this.http.get<AllContactsResponse>(`${this.apiUrl}/contacts`);
  }

  // Delete any contact
  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contacts/${id}`);
  }
}