import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-adversary',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './adversary.component.html',
  styleUrl: './adversary.component.css'
})
export class AdversaryComponent {

}
