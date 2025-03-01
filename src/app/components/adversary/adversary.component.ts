import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from "../../pages/card/card.component";

@Component({
  selector: 'app-adversary',
  standalone: true,
  imports: [MatCardModule, CommonModule, CardComponent],
  templateUrl: './adversary.component.html',
  styleUrl: './adversary.component.css'
})
export class AdversaryComponent {

}
