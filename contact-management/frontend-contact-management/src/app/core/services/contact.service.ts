import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data: Contact;
}

export interface ContactListResponse {
  success: boolean;
  message: string;
  data: Contact[];
  total: number;
}

export interface CreateContactData {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) {}

  // Get all contacts (with optional search & sort)
  getContacts(search?: string, sortBy?: string, sortOrder?: string): Observable<ContactListResponse> {
    let params = new HttpParams();
    
    if (search) params = params.set('search', search);
    if (sortBy) params = params.set('sortBy', sortBy);
    if (sortOrder) params = params.set('sortOrder', sortOrder);

    return this.http.get<ContactListResponse>(this.apiUrl, { params });
  }

  // Get single contact
  getContact(id: string): Observable<ContactResponse> {
    return this.http.get<ContactResponse>(`${this.apiUrl}/${id}`);
  }

  // Create contact
  createContact(data: CreateContactData): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, data);
  }

  // Update contact
  updateContact(id: string, data: Partial<CreateContactData>): Observable<ContactResponse> {
    return this.http.put<ContactResponse>(`${this.apiUrl}/${id}`, data);
  }

  // Delete contact
  deleteContact(id: string): Observable<ContactResponse> {
    return this.http.delete<ContactResponse>(`${this.apiUrl}/${id}`);
  }
}