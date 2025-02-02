import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { DragDropModule , CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem, CdkDragRelease } from '@angular/cdk/drag-drop';
import { CardComponent } from "../card/card.component";
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [MatCardModule, CommonModule, DragDropModule, CdkDropList, CardComponent],
  templateUrl: './card-game.component.html',
  styleUrl: './card-game.component.css',
  /*animations: [
    trigger('girar', [
      state('frente', style({
        transform: 'rotateY(0deg)',
      })),
      state('reverso', style({
        transform: 'rotateY(180deg)',
      })),
      transition('frente <=> reverso', [
        animate('1s ease-in-out')
      ])
    ]),
    trigger('entrada', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%) rotateY(180deg)',
          opacity: 0
        }),
        animate('1s ease-in-out', style({
          transform: 'translateX(0) rotateY(180deg)',
          opacity: 1
        }))
      ])
    ]),
  ]*/
})
export class CardGameComponent {
  cards: Card[] = [
    {id:1, name:'Greeny',img:'MON_1.svg', description: "He's green as his spells. He can throw acid from his mouth"},
    {id:2, name:'Molty',img:'MON_2.svg', description: 'Tiny but dangerous. He can use his eyes to fire molten rays'},
    {id:3, name:'Gician',img:'MON_3.svg', description: 'Powerful magician. His spells are really amazing'}
  ];
  cardsDropZone: Card[] = [];
  @ViewChild(CardComponent) child!:CardComponent;

  ngOnInit() {
    fromEvent(window, 'resize').pipe(
      throttleTime(200) 
    ).subscribe(() => {
      // Nothing here. Only for performance
    });
  };

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
    setTimeout(() => {
      this.child.girarCarta(event.item.data.id);
    }, 500);
  };
}
