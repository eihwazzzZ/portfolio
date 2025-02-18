import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdversaryComponent } from './adversary.component';

describe('AdversaryComponent', () => {
  let component: AdversaryComponent;
  let fixture: ComponentFixture<AdversaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdversaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdversaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
