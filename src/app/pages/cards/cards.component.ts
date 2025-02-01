import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

interface Movies {
  name: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  moviesArray: Movies[] = [
    { name: 'Movie 1' },
    { name: 'Movie 2' },
    { name: 'Movie 3' },
    { name: 'Movie 4' }
  ];

  onDrop(event: any) {
    const dragEvent = event as CdkDragDrop<Movies[]>; // Cast explícito del tipo
    console.log('Elemento soltado:', dragEvent.item.data);  // Mostramos la data del ítem
    console.log('Ítem movido a la posición', dragEvent.currentIndex); 
  }

  dragStarted(event: any) {
    console.log('Arrastre iniciado:', event);
  }
}
