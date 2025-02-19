import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../settings/appsettings';
import { User } from '../../interfaces/User';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean = false;
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }
  
  login(user: User): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, user)
  }  

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
