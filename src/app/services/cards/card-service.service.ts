import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {
  private carta$ = new BehaviorSubject<any>(null);  // Mantiene el estado de la carta

  constructor() { }

  // Método para enviar la carta arrastrada
  setCarta(carta: any) {
    this.carta$.next(carta);
  }

  // Método para obtener la carta arrastrada
  getCarta() {
    return this.carta$.asObservable();
  }
}
