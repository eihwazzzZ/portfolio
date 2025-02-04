import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElixirContainerComponent } from './elixir-container.component';

describe('ElixirContainerComponent', () => {
  let component: ElixirContainerComponent;
  let fixture: ComponentFixture<ElixirContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElixirContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElixirContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
