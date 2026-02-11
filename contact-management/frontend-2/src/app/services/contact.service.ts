import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// What a contact looks like
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

// Backend response for single contact
export interface ContactResponse {
  success: boolean;
  message: string;
  data: Contact;
}

// Backend response for contact list
export interface ContactListResponse {
  success: boolean;
  message: string;
  data: Contact[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   private apiUrl = `${environment.apiUrl}/contacts`;
  constructor(private http: HttpClient) {}

  getContacts(search?: string, sortBy?: string, sortOrder?: string):Observable<ContactListResponse>{
    let params = new HttpParams();
    if(search) params = params.set("param" , search );
    if(sortBy) params = params.set("sortBy" , sortBy);
    if(sortOrder) params = params.set("sortOrder" , sortOrder);
    return this.http.get<ContactListResponse>(this.apiUrl, { params });
  }

  getContact(id:string):Observable<ContactResponse>{
    return this.http.get<ContactResponse>(`${this.apiUrl}/${id}`);
  }
  createContact(data :any):Observable<ContactResponse>{
    return this.http.post<ContactResponse>(this.apiUrl, data);
  }
  updateContact(id:string , data :any):Observable<ContactResponse>{
    return this.http.put<ContactResponse>(`${this.apiUrl}/${id}`, data);
  }
  deleteContact(id:string):Observable<ContactResponse>{
    return this.http.delete<ContactResponse>(`${this.apiUrl}/${id}`);
  }
}