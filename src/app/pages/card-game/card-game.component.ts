import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatCardModule } from '@angular/material/card'; // Si usas Angular Material

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-game.component.html',
  styleUrl: './card-game.component.css',
  animations: [
    trigger('girar', [
      transition(':enter', [
        style({ transform: 'translateX(-100%) rotateY(90deg)', opacity: 0 }),
        animate('1s 0.3s ease-in-out', style({ transform: 'translateX(0) rotateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class CardGameComponent {
  cards = [1, 2, 3];
}
