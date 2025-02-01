import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGameContainerComponent } from './card-game-container.component';

describe('CardGameContainerComponent', () => {
  let component: CardGameContainerComponent;
  let fixture: ComponentFixture<CardGameContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGameContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardGameContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
