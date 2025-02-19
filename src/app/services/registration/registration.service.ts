import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../settings/appsettings';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  singUp(user: User): Observable<LoginResponse>{
      return this.http.post<LoginResponse>(`${this.baseUrl}/registration/signup`, user)
  }
}
