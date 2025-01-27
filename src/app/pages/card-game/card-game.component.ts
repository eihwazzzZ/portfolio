import { Component, HostListener  } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { MatCardModule } from '@angular/material/card'; // Si usas Angular Material
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './card-game.component.html',
  styleUrl: './card-game.component.css',
  animations: [
    trigger('girar', [
      state('frente', style({
        transform: 'rotateY(0deg)', // Estado frontal (mostrando el contenido)
      })),
      state('reverso', style({
        transform: 'rotateY(180deg)', // Estado invertido (reverso de la carta)
      })),
      transition('frente <=> reverso', [
        animate('1s ease-in-out')
      ])
    ]),
    trigger('entrada', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%) rotateY(180deg)', // Empuja desde la izquierda y gira en 3D
          opacity: 0
        }),
        animate('1s ease-in-out', style({
          transform: 'translateX(0) rotateY(180deg)', // Lleva al centro y mantiene la rotación de 180 grados
          opacity: 1
        }))
      ])
    ])
  ]
})
export class CardGameComponent {
  cards = [1, 2, 3];
  cartaEstado: { [key: number]: 'frente' | 'reverso' } = { 1: 'reverso', 2: 'reverso', 3: 'reverso' };
  shouldChangeBg: { [key: number]: boolean } = { 1: false, 2: false, 3: false };
  isAnimating: { [key: number]: boolean } = { 1: false, 2: false, 3: false };

  ngOnInit() {
    fromEvent(window, 'resize').pipe(
      throttleTime(200) 
    ).subscribe(() => {
      // Nothing here. Only for performance
    });
  }

  girarCarta(cartaId: number): void {
    if (this.isAnimating[cartaId]) return;

    this.isAnimating[cartaId] = true;

    this.cartaEstado[cartaId] = this.cartaEstado[cartaId] === 'reverso' ? 'frente' : 'reverso';

    setTimeout(() =>{
      this.shouldChangeBg[cartaId] = !this.shouldChangeBg[cartaId];
    }, 500)
    
    setTimeout(() => {
      this.isAnimating[cartaId] = false;
    }, 1000);
  }
}
