import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { DragDropModule , CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem, CdkDragRelease } from '@angular/cdk/drag-drop';
import { CardComponent } from "../card/card.component";
import { Card } from '../../models/card';
import { ActionType } from '../../models/enums/action-type';

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
export class CardGameComponent implements OnInit {

  @ViewChild(CardComponent) child!:CardComponent;
  cards: Card[] = [];
  cardsDropZone: Card[] = [];
  dropZoneLimit: boolean = false;

  ngOnInit() {
    this.cards.push(new Card(1, 'Greeny','MON_1.svg',100,[
      {id: 1, name: 'Punch', energyConsumption: 1, damage: 10, type: ActionType.DamageAttack}
    ]));
    this.cards.push(new Card(2, 'Molty','MON_2.svg',120,[
      {id: 2, name: 'Kick', energyConsumption: 1, damage: 15, damageToSelf: 10, type: ActionType.MutualDamageAttack}
    ]));
    this.cards.push(new Card(2, 'Gician','MON_3.svg',80,[
      {id: 3, name: 'Debuff', energyConsumption: 1, damage: 0, type: ActionType.DebuffAttack}
    ]));
    fromEvent(window, 'resize').pipe(
      throttleTime(200) 
    ).subscribe(() => {
      // Nothing here. Only for performance
    });
  };

  drop(event: CdkDragDrop<Card[]>) {
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
    this.dropZoneLimit = true;
    setTimeout(() => {
      this.child.girarCarta(event.item.data.id);
    }, 500);
  };
}
