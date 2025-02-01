import { Component } from '@angular/core';
import { BattleFieldComponent } from "../battle-field/battle-field.component";
import { CardsComponent } from "../cards/cards.component";

@Component({
  selector: 'app-card-game-container',
  standalone: true,
  imports: [BattleFieldComponent, CardsComponent],
  templateUrl: './card-game-container.component.html',
  styleUrl: './card-game-container.component.css'
})
export class CardGameContainerComponent {

  carta: any = null;  // Aquí se almacenará la carta que se soltaría

  // Método que recibe la carta cuando se suelta
  onCartaSuelta(carta: any) {
    this.carta = carta;
    console.log('Carta colocada en el campo:', carta);
  }

}
