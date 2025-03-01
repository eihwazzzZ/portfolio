import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected http = inject(HttpClient);
  protected baseUrl: string = appsettings.apiUrl;

  constructor() { }
}
