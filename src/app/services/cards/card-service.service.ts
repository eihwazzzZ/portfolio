import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { appsettings } from '../../settings/appsettings';
import { Card } from '../../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;
  private carta$ = new BehaviorSubject<any>(null);

  constructor() { }

  getCardsByUsername(): Observable<Card[]> {
    const username = localStorage.getItem('username');
    return this.http.get<Card[]>(`${this.baseUrl}/cards/user`,{
      params: { username: username || '' }
    });
  }

  setCard(carta: any) {
    this.carta$.next(carta);
  }

  getCard() {
    return this.carta$.asObservable();
  }
}
