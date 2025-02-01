import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule , CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray, transferArrayItem, CdkDragRelease } from '@angular/cdk/drag-drop';

interface Card {
  id: number,
  name: string
};

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, DragDropModule, CdkDrag, CdkDropList],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  cards: Card[] = [
      {id:1, name:'Card 1'},
      {id:2, name:'Card 2'},
      {id:3, name:'Card 3'}
    ];
    cardsDropZone: Card[] = [];
    cartaEstado: { [key: number]: 'frente' | 'reverso' } = { 1: 'reverso', 2: 'reverso', 3: 'reverso' };
    shouldChangeBg: { [key: number]: boolean } = { 1: false, 2: false, 3: false };
    isAnimating: { [key: number]: boolean } = { 1: false, 2: false, 3: false };
    isDragging: { [key: number]: boolean } = { 1: false, 2: false, 3: false };
  
    ngOnInit() {
      fromEvent(window, 'resize').pipe(
        throttleTime(200) 
      ).subscribe(() => {
        // Nothing here. Only for performance
      });
    };
  
    girarCarta(cartaId: number): void {
      if (this.isAnimating[cartaId] || this.isDragging[cartaId]) return;
  
      this.isAnimating[cartaId] = true;
  
      this.cartaEstado[cartaId] = this.cartaEstado[cartaId] === 'reverso' ? 'frente' : 'reverso';
  
      setTimeout(() =>{
        this.shouldChangeBg[cartaId] = !this.shouldChangeBg[cartaId];
      }, 500)
  
      setTimeout(() => {
        this.isAnimating[cartaId] = false;
      }, 1000);
    };
  
    dragEnded(event: CdkDragRelease) {
      setTimeout(() => {
        this.girarCarta(event.source.data.id);
      }, 100);
    }
  
    drop(event: CdkDragDrop<Card[]>) {
      console.log(event);
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    };
}
