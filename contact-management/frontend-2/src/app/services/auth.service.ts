import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient, private router: Router) {}

  register(name :string , email :string , password:string):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`,{
        name , email , password
    }).pipe(tap(response => {
        if (response.success) {
          this.saveSession(response.data);
        }else{
            console.log("error in register user" , response.data)
        }
    }))
  }

  login(email :string , password:string):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/login` ,{
        email , password
    }).pipe(tap(response =>{
        if (response.success) {
          this.saveSession(response.data);
        }else{
            console.log("error in login user" , response.data)
        }
    }))
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user" );
    this.router.navigate(["/login"])
  }

  getToken():string|null{
    return localStorage.getItem("token")
  }
  getUser():User|null{
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  isLoggedIn() {
    if (this.getToken()) {
    return true; 
  } else {
    return false;
  }
 }
 isAdmin():boolean{
    return this.getUser()?.role === 'ADMIN';
 }

  private saveSession(data :{ user: User; token: string }):void{
    localStorage.setItem("token",data.token);
    localStorage.setItem("user",JSON.stringify(data.user));
  }
}