import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { Card } from '../../models/card';

@Injectable({
  providedIn: 'root'
})
export class AdversaryService extends BaseService {

  constructor() {
    super();
  }

  getAdversaryCardsByUsername(): Observable<Card[]> {
    const username = localStorage.getItem('username');
    return this.http.get<Card[]>(`${this.baseUrl}/adversary/cards`,{
      params: { username: username || '' }
    });
  }
}
