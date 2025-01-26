import { Component } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { MatCardModule } from '@angular/material/card'; // Si usas Angular Material

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [MatCardModule],
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

  girarCarta(cartaId: number): void {
    this.cartaEstado[cartaId] = this.cartaEstado[cartaId] === 'reverso' ? 'frente' : 'reverso';
  }
}
