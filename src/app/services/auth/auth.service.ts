import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../settings/appsettings';
import { User } from '../../interfaces/user';
import { LoginResponse } from '../../interfaces/login-response';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean = false;
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;
  private publicRoutes = [
    '/api/users',
    '/api/auth/login',
    '/api/registration/signup'
  ];

  constructor() { }

  isPublicRoute(url: string): boolean {
    return this.publicRoutes.some(route => url.includes(route));
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }
  
  login(user: User): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, user)
    .pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', user.username);
      })
    );
  }  

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
