import { Component } from '@angular/core';
import { CardServiceService } from '../../services/cards/card-service.service';

@Component({
  selector: 'app-battle-field',
  standalone: true,
  imports: [],
  templateUrl: './battle-field.component.html',
  styleUrl: './battle-field.component.css'
})
export class BattleFieldComponent {

  cartaEnCampo: any = null;

  constructor(private cardService: CardServiceService) {}

  ngOnInit() {
    // Escucha cuando la carta es arrastrada y soltada
    this.cardService.getCarta().subscribe(carta => {
      if (carta) {
        this.cartaEnCampo = carta;
        console.log('Carta colocada en el campo:', carta);
      }
    });
  }
  
  onDrop(event: any) {
    const carta = event.item;
    carta._dragRef.reset();
    carta._dragRef.drop();
    // Animar a la carta como si estuviera "cayendo"
    carta._dragRef.getFreeDragPosition();
    console.log('Carta soltada');
  }

}
