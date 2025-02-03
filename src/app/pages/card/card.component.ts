import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule, CdkDrag, CdkDragRelease } from '@angular/cdk/drag-drop';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgZone } from '@angular/core';
import { Card } from '../../models/card';
import { ActionType } from '../../models/enums/action-type';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, DragDropModule, CdkDrag, MatGridListModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  animations: [
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
        ]),
      ]),
      
    ]
})
export class CardComponent {
  @Input() card!: Card;
  @Input() isInDropZone: boolean = false;

  //@ViewChild('cardElement', { static: false }) cardElement!: ElementRef;
    
    cartaEstado: { [key: number]: 'frente' | 'reverso' } = { 1: 'reverso', 2: 'reverso', 3: 'reverso' };
    shouldChangeBg: { [key: number]: boolean } = { 1: false, 2: false, 3: false };
    isAnimating: { [key: number]: boolean } = { 1: false, 2: false, 3: false };
    isDragging: { [key: number]: boolean } = { 1: false, 2: false, 3: false };
    dropZoneLimit: boolean = false;
    actionTypes = ActionType;

    constructor(private cdRef: ChangeDetectorRef, private zone: NgZone) {}
  
    girarCarta(cartaId: number): void {
      if (this.isAnimating[cartaId] || this.isDragging[cartaId]) return;
  
      this.isAnimating[cartaId] = true;
      this.cdRef.detectChanges();
      this.cartaEstado[cartaId] = this.cartaEstado[cartaId] === 'reverso' ? 'frente' : 'reverso';
      this.cdRef.detectChanges();
      setTimeout(() =>{
        this.shouldChangeBg[cartaId] = !this.shouldChangeBg[cartaId];
      }, 500)
  
      setTimeout(() => {
        this.isAnimating[cartaId] = false;
      }, 1000);
    };
  
    dragEnded(event: CdkDragRelease) {
      this.dropZoneLimit = true;
      setTimeout(() => {
        /*if (this.cardElement) {
          this.cardElement.nativeElement.click();
        }*/
        this.zone.run(() => {
          //this.girarCarta(event.source.data.id);
          /*const card = this.cardElement.nativeElement;

          if (this.cartaEstado[event.source.data.id] === 'frente') {
            
            card.style.transition = 'transform 1s ease-in-out';
            card.style.transform = 'rotateY(0deg)';
          } else {
            
            card.style.transition = 'transform 1s ease-in-out';
            card.style.transform = 'rotateY(180deg)';
          }*/
          //this.cdRef.detectChanges();
        });
      }, 500);
    }
}
