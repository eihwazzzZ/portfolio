import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../settings/appsettings';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/User';
import { UserResponse } from '../../interfaces/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  singUp(user: User): Observable<UserResponse>{
      return this.http.post<UserResponse>(`${this.baseUrl}/registration/signup`, user)
  }
}
